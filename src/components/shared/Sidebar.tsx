"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const linkClass =
  "block px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted transition";

export default function Sidebar() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) return null;

  const { role, name } = user;

  return (
    <aside className="fixed top-0 left-0 z-50 w-64 h-screen bg-background border-r p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">Dashboard</h2>

        <nav className="space-y-1">
          {role === "student" && (
            <>
              <Link href="/dashboard/student/assignments" className={cn(linkClass)}>
                Assignments
              </Link>
              <Link href="/dashboard/student/submissions" className={cn(linkClass)}>
                My Submissions
              </Link>
            </>
          )}

          {role === "instructor" && (
            <>
              <Link href="/dashboard/instructor/assignments" className={cn(linkClass)}>
                Create Assignment
              </Link>
              <Link href="/dashboard/instructor/review" className={cn(linkClass)}>
                Review Submissions
              </Link>
              <Link href="/dashboard/instructor/chart" className={cn(linkClass)}>
                Submission Stats
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Welcome, <span className="font-medium capitalize">{name}</span> ({role})
        </p>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </aside>
  );
}
