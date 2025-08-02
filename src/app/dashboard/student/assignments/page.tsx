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

  if (loading) return <p className="text-center py-10">Loading assignments...</p>;

  if (error)
    return (
      <p className="text-center py-10 text-red-600 font-semibold">{error}</p>
    );

  if (assignments.length === 0)
    return (
      <p className="text-center py-10 text-gray-600">No assignments available</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Available Assignments
      </h1>
      <ul className="space-y-6">
        {assignments.map((a) => (
          <li
            key={a._id}
            className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800"
          >
            <h2 className="font-semibold text-xl mb-2 text-gray-800 dark:text-gray-200">
              {a.title}
            </h2>
            <p className="mb-3 text-gray-700 dark:text-gray-300">{a.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Deadline: {new Date(a.deadline).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
