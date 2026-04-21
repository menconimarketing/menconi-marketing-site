import type { Metadata } from "next";
import { Afacad, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Menconi Marketing | Strategic Positioning Partner",
  description:
    "You don't need more marketing. You need a position to market. I find your unowned space — then build the website, ads, and automation that prove you own it.",
  openGraph: {
    title: "Menconi Marketing — Strategic Positioning Partner",
    description:
      "Stop competing on price. Start owning a position. One person. No handoffs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${afacad.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
