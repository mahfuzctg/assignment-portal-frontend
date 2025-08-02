"use client";

import { useState } from "react";
import assignmentService from "@/services/assignmentService";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function InstructorAssignmentsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await assignmentService.createAssignment({ title, description, deadline });
      setMessage("Assignment created successfully!");
      setIsSuccess(true);
      setTitle("");
      setDescription("");
      setDeadline("");
    } catch (error) {
      setMessage("Failed to create assignment.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create New Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert variant={isSuccess ? "default" : "destructive"} className="mb-4">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Assignment Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                minLength={3}
              />
            </div>

            <div>
              <Textarea
                placeholder="Assignment Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                minLength={10}
              />
            </div>

            <div>
              <Input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>

            <div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Creating..." : "Create Assignment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}