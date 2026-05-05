import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amazing 3D Websites",
  description: "8 genre-defining animated landing pages",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
