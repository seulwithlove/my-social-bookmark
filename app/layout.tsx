import { BookMarkedIcon } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Nav from "./nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seul's Social Bookmark",
  description: "Social Bookmark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <div className="container mx-auto flex h-screen flex-col justify-center">
            <header className="flex justify-between border-b-1">
              <Link
                href="/"
                className="flex items-center font-semibold text-3xl text-pink-300 tracking-tight">
                <BookMarkedIcon /> BookMark
              </Link>
              <Nav />
            </header>
            <main className="flex-1">{children}</main>
            <footer className="text-center text-pink-300">
              &#169; Seul 2025
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
