"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();

  // If no session or no user, return null
  if (!session?.user) return null;

  const role = session.user?.role;

  return (
    <aside className="w-64 bg-white text-gray-800 p-6 min-h-screen shadow-md">
      <h2 className="mb-6 text-xl font-bold border-b border-gray-300 pb-2">
        Dashboard
      </h2>
      <nav className="flex flex-col space-y-4">
        {role === "student" && (
          <>
            <Link
              href="/dashboard/student/assignments"
              className="hover:text-yellow-600 transition-colors"
            >
              Assignments
            </Link>
            <Link
              href="/dashboard/student/submissions"
              className="hover:text-yellow-600 transition-colors"
            >
              My Submissions
            </Link>
          </>
        )}

        {role === "instructor" && (
          <>
            <Link
              href="/dashboard/instructor/assignments"
              className="hover:text-yellow-600 transition-colors"
            >
              Create Assignment
            </Link>
            <Link
              href="/dashboard/instructor/review"
              className="hover:text-yellow-600 transition-colors"
            >
              Review Submissions
            </Link>
            <Link
              href="/dashboard/instructor/chart"
              className="hover:text-yellow-600 transition-colors"
            >
              Submission Stats
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
