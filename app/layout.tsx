import type { Metadata, Viewport } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const archivoBlack = Archivo_Black({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://cscssolar.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "CSCS Solar — Commercial Solar Panel Cleaning in the Central Valley",
    template: "%s | CSCS Solar",
  },
  description:
    "Commercial Solar Cleaning Services (CSCS) — eco-friendly deionized water cleaning for businesses and public agencies across the Central Valley. Trusted by Fresno County Rural Transit Agency.",
  keywords: [
    "commercial solar cleaning",
    "solar panel cleaning Fresno",
    "Central Valley solar maintenance",
    "deionized water solar cleaning",
    "FCRTA solar",
    "public agency solar maintenance",
    "Clovis Madera Visalia solar cleaning",
  ],
  applicationName: "CSCS Solar",
  authors: [{ name: "Commercial Solar Cleaning Services" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "CSCS Solar",
    title:
      "Commercial Solar Panel Cleaning for Businesses & Public Agencies",
    description:
      "Eco-friendly deionized water cleaning. Trusted by Fresno County Rural Transit Agency. Serving the Central Valley.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSCS Solar — Commercial Solar Panel Cleaning",
    description:
      "Eco-friendly deionized water cleaning for businesses and public agencies across the Central Valley.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B5ED7" },
    { media: "(prefers-color-scheme: dark)", color: "#052654" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivoBlack.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-white text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
