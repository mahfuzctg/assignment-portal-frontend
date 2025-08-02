"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";


export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white text-gray-900 shadow px-6 py-4 flex justify-between items-center">
      <Link href="/">
        <span className="text-xl font-bold cursor-pointer">Assignment Portal</span>
      </Link>

      <div className="space-x-4 flex items-center">
        <Link href="/">
          <Button variant="ghost" className="text-sm font-medium">
            Home
          </Button>
        </Link>

        {status === "loading" ? (
          <span className="text-sm text-gray-500">Loading...</span>
        ) : session?.user ? (
          <>
            <Link href="/dashboard">
              <Button variant="ghost" className="text-sm font-medium">
                Dashboard
              </Button>
            </Link>

            <span className="text-sm">
              Welcome,{" "}
              <span className="font-semibold capitalize">{session.user.name}</span>{" "}
              (<span className="capitalize">{session.user.role}</span>)
            </span>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Register</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
