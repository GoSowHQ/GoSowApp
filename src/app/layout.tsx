import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoSOW — Fund the Future of Tech",
  description:
    "The modern crowdfunding platform for tech startups,open-source projects, hackathons, and indie developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
