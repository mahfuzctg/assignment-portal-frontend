"use client";

import { useEffect, useState } from "react";
import assignmentService from "@/services/assignmentService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Assignment {
  _id: string;
  title: string;
  description: string;
  deadline: string;
}

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    assignmentService
      .getAssignments()
      .then((data) => {
        setAssignments(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load assignments");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {[...Array(4)].map((_, idx) => (
          <Card key={idx} className="p-4">
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </Card>
        ))}
      </div>
    );

  if (error)
    return (
      <p className="text-center py-10 text-red-600 font-semibold">{error}</p>
    );

  if (assignments.length === 0)
    return (
      <p className="text-center py-10 text-muted-foreground">
        No assignments available
      </p>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-foreground text-center">
        Available Assignments
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {assignments.map((a) => (
          <Card key={a._id}>
            <CardHeader>
              <CardTitle className="text-lg">{a.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {a.description}
              </p>
              <p className="text-xs text-muted-foreground">
                Deadline: {new Date(a.deadline).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
