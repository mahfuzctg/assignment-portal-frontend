"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/">
        <span className="text-lg font-bold cursor-pointer">Assignment Portal</span>
      </Link>

      <div className="space-x-4 flex items-center">
        <Link href="/">Home</Link>

        {status === "loading" ? (
          <span>Loading...</span>
        ) : session?.user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>

            <span className="ml-4 mr-2">
              Welcome,{" "}
              <span className="font-semibold capitalize">{session.user.name}</span>{" "}
              (<span className="capitalize">{session.user.role}</span>)
            </span>

            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
