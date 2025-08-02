"use client";

import { useEffect, useState } from "react";
import submissionService from "@/services/submissionService";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

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
      toast.success("Submission updated successfully!");
      const updated = await submissionService.getAllSubmissions();
      setSubmissions(updated);
    } catch {
      toast.error("Failed to update submission.");
    }
  };

  const pieData = [
    { name: "Pending", value: submissions.filter(s => s.status === "Pending").length },
    { name: "Accepted", value: submissions.filter(s => s.status === "Accepted").length },
    { name: "Rejected", value: submissions.filter(s => s.status === "Rejected").length },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      <h2 className="text-3xl font-semibold text-center">Instructor Submission Dashboard</h2>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Submission Status Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {submissions.map((sub) => (
          <Card key={sub._id} className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-800">
                {sub.assignmentId?.title} - {sub.studentId?.email}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                <strong>Submission:</strong> {sub.submissionText}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Status:</strong> {sub.status}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Feedback:</strong> {sub.feedback || "N/A"}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const feedback = formData.get("feedback") as string;
                  const status = formData.get("status") as string;
                  handleUpdate(sub._id, feedback, status);
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <Input
                  name="feedback"
                  placeholder="Enter feedback..."
                  defaultValue={sub.feedback}
                />
                <Select name="status" defaultValue={sub.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full">
                    Update Submission
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
