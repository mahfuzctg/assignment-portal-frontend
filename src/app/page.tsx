"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push(
      "https://assignment-portal-frontend.vercel.app/auth/login"
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Welcome to Assignment Portal!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Please login to continue and access your dashboard.
      </p>
      <Button onClick={handleLoginClick} variant="default" size="lg">
        Go to Login
      </Button>
    </div>
  );
}
