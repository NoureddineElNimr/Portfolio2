import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio – Noureddine El Nimr",
  description:
    "Portfolio of Noureddine El Nimr – final-year Applied Computer Science student at Thomas More, Geel. Building web apps with C#, .NET, React, Angular and more.",
  openGraph: {
    title: "Portfolio – Noureddine El Nimr",
    description: "Final-year dev at Thomas More. Projects in C#, .NET, React, Angular, chatbots and more.",
    url: "https://your-portfolio-url.vercel.app",
    siteName: "Noureddine El Nimr – Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Noureddine El Nimr – Portfolio" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio – Noureddine El Nimr",
    description: "Final-year dev at Thomas More. C#, .NET, React, Angular and more.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        /* No overflow:hidden — body scrolls normally */
      >
        {/* Navbar is fixed, sits outside the content flow */}
        <Navbar />

        {/* Normal page flow — scrolls naturally */}
        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}