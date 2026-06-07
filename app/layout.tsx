import type { Metadata, Viewport } from "next";
import { Syne, Work_Sans } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import ConditionalFooter from "@/components/ConditionalFooter";
import LayoutNavigation from "@/components/LayoutNavigation";
import Head from "next/head";

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elk Audios",
  description: "Elk Audios",
  openGraph: {
    title: "Elk Audios",
    description: "Elk Audios",
    url: "https://elk-audios-nine.vercel.app/",
    siteName: "Elk Audios",
    images: [
      {
        url: "https://elk-audios-nine.vercel.app/assets/Logo.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elk Audios",
    description: "Elk Audios",
    images: ["https://elk-audios-nine.vercel.app/assets/Logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        {/* Standard favicon */}
        <link rel="icon" href="/assets/favicon_Logo_White.png" />
        {/* Optional: smaller icons for older browsers */}
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon_Logo_White.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon_Logo_White.png" />
        {/* Optional: Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/assets/favicon_Logo_White.png" />
      </Head>

      <body className={`${syne.variable} ${workSans.variable} relative`}>
        <LayoutNavigation />
        {children}
        <ConditionalFooter />
      </body>
    </html>
  );
}