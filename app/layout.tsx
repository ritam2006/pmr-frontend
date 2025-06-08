import { Mulish } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Risk Master",
  description: "This platform allows you to track investments, view key information about assets, and understand the overall risk of your (mock) portfolio. It’s designed to you make more informed decisions about how to manage your invested money.",
  icons: {
    icon: '/favicon.svg',
  },
};
 
const mulish = Mulish({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mulish.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
