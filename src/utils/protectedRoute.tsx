"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  role: "student" | "instructor";
  children: React.ReactNode;
}

export default function ProtectedRoute({ role, children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      const userRole = session?.user?.role;
      if (!userRole || userRole !== role) {
        router.push("/");
      }
    }
  }, [status, session, router, role]);

  if (status === "loading") return <p>Loading...</p>;

  if (status === "authenticated" && session?.user?.role !== role) {
    return null;
  }

  return <>{children}</>;
}
