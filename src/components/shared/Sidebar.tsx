"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();

  // If no session or no user, return null
  if (!session?.user) return null;

  const role = session.user?.role;

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 min-h-screen">
      <h2 className="mb-6 text-xl font-bold">Dashboard</h2>
      <nav className="flex flex-col space-y-3">
        {role === "student" && (
          <>
            <Link href="/dashboard/student/assignments" className="hover:text-yellow-300">
              Assignments
            </Link>
            <Link href="/dashboard/student/submissions" className="hover:text-yellow-300">
              My Submissions
            </Link>
          </>
        )}

        {role === "instructor" && (
          <>
            <Link href="/dashboard/instructor/assignments" className="hover:text-yellow-300">
              Create Assignment
            </Link>
            <Link href="/dashboard/instructor/review" className="hover:text-yellow-300">
              Review Submissions
            </Link>
            <Link href="/dashboard/instructor/chart" className="hover:text-yellow-300">
              Submission Stats
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
