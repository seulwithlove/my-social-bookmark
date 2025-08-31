import { BookHeartIcon, BookMarkedIcon } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="container mx-auto flex h-screen flex-col justify-center">
          <header className="flex justify-between border-b-1">
            <Link
              href="/"
              className="flex items-center font-semibold text-3xl text-pink-300 tracking-tight">
              <BookMarkedIcon /> BookMark
            </Link>
            {/* Nav */}
            <div className="flex items-center gap-5">
              <Link
                href={"/bookcase"}
                className="rounded-full border-0 p-1 hover:ring-0 active:scale-75 [&>svg:hover]:stroke-red-500 [&>svg]:stroke-pink-300">
                <BookHeartIcon />
              </Link>
              <Link href="/my" className={"text-btn"}>
                My
              </Link>
              <Link href="/sign" className={"text-btn"}>
                Login
              </Link>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="text-center text-pink-300">
            &#169; Seul 2025
          </footer>
        </div>
      </body>
    </html>
  );
}
