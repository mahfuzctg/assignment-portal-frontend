"use client";

import { useState } from "react";
import assignmentService from "@/services/assignmentService";

export default function InstructorAssignmentsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await assignmentService.createAssignment({ title, description, deadline });
      setMessage("Assignment created successfully!");
      setTitle("");
      setDescription("");
      setDeadline("");
    } catch (error) {
      setMessage("Failed to create assignment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white text-gray-800 p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2">
        Create Assignment
      </h1>

      {message && (
        <p
          className={`mb-4 px-3 py-2 rounded ${
            message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          minLength={3}
        />

        <textarea
          placeholder="Description"
          className="border border-gray-300 p-3 rounded h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          minLength={10}
        />

        <input
          type="date"
          className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded disabled:bg-gray-400 transition-colors duration-200"
        >
          {loading ? "Creating..." : "Create Assignment"}
        </button>
      </form>
    </div>
  );
}
