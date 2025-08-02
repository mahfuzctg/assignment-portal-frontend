"use client";

import { useEffect, useState } from "react";
import assignmentService from "@/services/assignmentService";

interface Assignment {
  _id: string;
  title: string;
  description: string;
  deadline: string;
}

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    assignmentService.getAssignments().then((data) => {
      setAssignments(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading assignments...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Available Assignments</h1>
      <ul className="space-y-4">
        {assignments.map((a) => (
          <li key={a._id} className="p-4 border rounded shadow">
            <h2 className="font-semibold text-lg">{a.title}</h2>
            <p>{a.description}</p>
            <p className="text-sm text-gray-600">Deadline: {new Date(a.deadline).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
