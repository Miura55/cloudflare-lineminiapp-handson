import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LiffProvider } from "./liffProvider";
import VConsole from "./components/VConsole";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mobile Order",
  description: "Mobile Order App for Cloud Village",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LiffProvider liffId={process.env.LIFF_ID ?? ""}>
          {children}
          <VConsole />
        </LiffProvider>
      </body>
    </html>
  );
}
