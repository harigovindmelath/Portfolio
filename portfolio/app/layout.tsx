import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harigovind P | AI/ML Engineer",
  description:
    "AI/ML Engineer building intelligent systems with strong backend and software development expertise.",
  keywords: [
    "AI",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Backend Developer",
    "Python",
    "PyTorch",
    "Django",
    "Flask",
  ],
  authors: [{ name: "Harigovind P" }],
  openGraph: {
    title: "Harigovind P | AI/ML Engineer",
    description:
      "AI/ML Engineer building intelligent systems with strong backend and software development expertise.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-animated-gradient relative overflow-x-hidden`}
      >
        {/* Background Noise Texture */}
        <div className="fixed inset-0 bg-noise z-50 pointer-events-none" />

        <Navbar />
        <main className="flex-1 w-full relative z-10 flex flex-col h-full overflow-y-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
