import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Menconi Marketing — Websites, ad systems, AI revenue tools",
  description:
    "One-person marketing studio. Websites, paid ads, and AI revenue tools for service businesses. Direct work, no agency layer. Chicago, IL — by appointment.",
  openGraph: {
    title: "Menconi Marketing",
    description:
      "Websites, ad systems, and AI revenue tools for service businesses. Direct work, no agency layer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${afacad.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
