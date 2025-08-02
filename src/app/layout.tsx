
import "./globals.css";


import SessionProviderWrapper from "@/app/providers/SessionProviderWrapper";
import Navbar from "@/components/shared/Navbar";

export const metadata = {
  title: "Assignment Submission Portal",
  description: "Assignment submission portal for instructors and students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <Navbar />
          <main className="max-w-7xl mx-auto p-4">{children}</main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
