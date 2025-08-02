"use client";

import { useEffect, useState } from "react";
import submissionService from "@/services/submissionService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { toast } from "sonner";

const STATUS_COLORS = {
  Pending: "#facc15",
  Accepted: "#4ade80",
  Rejected: "#f87171",
};

export default function InstructorSubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    submissionService.getAllSubmissions()
      .then(setSubmissions)
      .catch(() => toast.error("Failed to load submissions"));
  }, []);

  const handleUpdate = async (id: string, feedback: string, status: string) => {
    try {
      await submissionService.updateSubmission(id, { feedback, status });
      toast.success("Updated");
      const res = await submissionService.getAllSubmissions();
      setSubmissions(res);
    } catch {
      toast.error("Failed to update");
    }
  };

  const pieData = [
    { name: "Pending", value: submissions.filter(s => s.status === "Pending").length },
    { name: "Accepted", value: submissions.filter(s => s.status === "Accepted").length },
    { name: "Rejected", value: submissions.filter(s => s.status === "Rejected").length },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">All Student Submissions</h2>

      <PieChart width={400} height={300}>
        <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <div className="mt-8 space-y-6">
        {submissions.map(sub => (
          <div key={sub._id} className="border p-4 rounded-md bg-gray-100">
            <p><strong>Assignment:</strong> {sub.assignmentId?.title}</p>
            <p><strong>Student:</strong> {sub.studentId?.email}</p>
            <p><strong>Text:</strong> {sub.submissionText}</p>
            <p><strong>Status:</strong> {sub.status}</p>
            <p><strong>Feedback:</strong> {sub.feedback || "N/A"}</p>

            <form
              onSubmit={e => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const status = data.get("status") as string;
                const feedback = data.get("feedback") as string;
                handleUpdate(sub._id, feedback, status);
              }}
              className="mt-4 space-y-2"
            >
              <Input name="feedback" placeholder="Enter feedback..." defaultValue={sub.feedback} />
              <select name="status" defaultValue={sub.status} className="w-full px-2 py-1 rounded-md border">
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
              <Button type="submit">Update</Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
