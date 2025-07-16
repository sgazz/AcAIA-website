import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AcAIA – AI Assistant for Learning & Development",
  description: "An AI assistant that makes learning smarter, simpler, and more personal.",
  keywords: "AI, learning, education, chat, problems, exams, career",
  authors: [{ name: "AcAIA Team" }],
  openGraph: {
    title: "AcAIA – AI Assistant for Learning & Development",
    description: "Discover a smarter way to learn with AcAIA.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AcAIA – AI Assistant for Learning & Development",
    description: "An AI assistant that helps students and teachers succeed.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
