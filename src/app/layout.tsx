import "./globals.css";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import SessionProviderWrapper from "@/app/providers/SessionProviderWrapper";
import Navbar from "@/components/shared/Navbar";
import { authOptions } from "@/components/lib/auth";


export const metadata = {
  title: "Assignment Submission Portal",
  description: "Assignment submission portal for instructors and students",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const isLoggedIn = !!session?.user;

  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {isLoggedIn ? (
            <>
              <Navbar />
              <main className="max-w-7xl mx-auto p-4">{children}</main>
            </>
          ) : (
            // Show login page only
            <main className="min-h-screen flex items-center justify-center bg-gray-50">
              {children}
            </main>
          )}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
