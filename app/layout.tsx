import { Mulish } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Risk Master",
  description: "Track your investments, explore assets, and understand portfolio risk, all in one place. A simple tool to help you make smarter financial decisions."
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
