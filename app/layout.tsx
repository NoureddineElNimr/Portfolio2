import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/Themeprovider";
import SmoothCursor from "@/components/ui/SmoothCursor";

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
    // data-theme="dark" always matches useState(true) in ThemeProvider — no mismatch.
    // ThemeProvider useEffect updates data-theme to "light" after hydration if needed.
    // No inline script — that was mutating <html> style before React hydrated causing errors.
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <SmoothCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}