"use client";

import { useEffect, useState } from "react";
import assignmentService from "@/services/assignmentService";
import submissionService from "@/services/submissionService";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Assignment {
  _id: string;
  title: string;
}

interface Submission {
  _id: string;
  assignmentId: {
    _id: string;
    title: string;
    deadline?: string;
  };
  submissionText: string;
  status: "Pending" | "Accepted" | "Rejected";
  feedback?: string;
  createdAt: string;
}

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState("");
  const [submissionText, setSubmissionText] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Load assignments for student
  useEffect(() => {
    assignmentService.getAssignments()
      .then((res) => setAssignments(res))
      .catch(() => toast.error("Failed to load assignments"));
  }, []);

  // Load student's previous submissions
  useEffect(() => {
    submissionService.getMySubmissions()
      .then(setSubmissions)
      .catch(() => toast.error("Failed to load your submissions"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAssignmentId || !submissionText.trim()) {
      toast.error("Please select an assignment and enter submission text");
      return;
    }

    try {
      await submissionService.submitAssignment({
        assignmentId: selectedAssignmentId,
        submissionText,
      });

      toast.success("Assignment submitted successfully!");

      setSubmissionText("");
      setSelectedAssignmentId("");

      // Refresh submissions list
      const updated = await submissionService.getMySubmissions();
      setSubmissions(updated);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">Assignments</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <select
          className="w-full border rounded-md px-4 py-2"
          value={selectedAssignmentId}
          onChange={(e) => setSelectedAssignmentId(e.target.value)}
          required
        >
          <option value="">Select Assignment</option>
          {assignments.map((a) => (
            <option key={a._id} value={a._id}>
              {a.title}
            </option>
          ))}
        </select>

        <Textarea
          placeholder="Enter submission URL or notes"
          value={submissionText}
          onChange={(e) => setSubmissionText(e.target.value)}
          required
        />

        <Button type="submit" className="w-full">
          Submit Assignment
        </Button>
      </form>

      <h3 className="text-xl font-semibold mb-4">Your Submissions</h3>
      {submissions.length === 0 && <p>No submissions yet.</p>}

      <ul className="space-y-4">
        {submissions.map((s) => (
          <li
            key={s._id}
            className="border p-4 rounded-md shadow-sm bg-gray-50"
          >
            <h4 className="font-semibold">{s.assignmentId.title}</h4>
            <p className="text-sm text-gray-600">Submitted on: {new Date(s.createdAt).toLocaleDateString()}</p>
            <p className="mt-2">{s.submissionText}</p>
            <p className="mt-2 font-semibold">
              Status:{" "}
              <span
                className={
                  s.status === "Accepted"
                    ? "text-green-600"
                    : s.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {s.status}
              </span>
            </p>
            {s.feedback && (
              <p className="mt-1 text-gray-700 italic">Feedback: {s.feedback}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
