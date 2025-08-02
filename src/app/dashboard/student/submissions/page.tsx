"use client";

import { useEffect, useState } from "react";
import submissionService from "@/services/submissionService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type TSubmission = {
  _id: string;
  assignmentId: {
    _id: string;
    title: string;
    description?: string;
  };
  submissionText: string;
  status: "Pending" | "Accepted" | "Rejected";
  feedback?: string;
  createdAt: string;
};

export default function StudentSubmissionsPage() {
  const [submissions, setSubmissions] = useState<TSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await submissionService.getMySubmissions();
        setSubmissions(data || []);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[150px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {submissions.map((submission) => (
            <Card key={submission._id}>
              <CardHeader>
                <CardTitle>{submission.assignmentId?.title || "Untitled Assignment"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-1">
                  <strong>Submitted:</strong> {new Date(submission.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm mb-1">
                  <strong>Submission URL:</strong>{" "}
                  <a
                    href={submission.submissionText}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-words"
                  >
                    {submission.submissionText}
                  </a>
                </p>
                <p className="text-sm mb-1">
                  <strong>Status:</strong>{" "}
                  <Badge
                    variant={
                      submission.status === "Accepted"
                        ? "default"
                        : submission.status === "Rejected"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {submission.status}
                  </Badge>
                </p>
                {submission.feedback && (
                  <p className="text-sm mt-2">
                    <strong>Feedback:</strong> {submission.feedback}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
