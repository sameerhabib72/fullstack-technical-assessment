import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial", "sans-serif"],
  weight: ["400", "500", "600", "700"],
});

// PDF 5.1 - Dynamic Meta Tags
export const metadata: Metadata = {
  other: {
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    "dns-prefetch": "https://images.unsplash.com",
    preconnect: "https://images.unsplash.com",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "The Design Firm - Digital Agency",
    template: "%s | The Design Firm",
  },
  description:
    "Building digital experiences that drive success. We are a creative digital agency helping businesses grow.",
  keywords: [
    "digital agency",
    "web development",
    "mobile apps",
    "UI/UX design",
    "digital marketing",
  ],
  authors: [{ name: "The Design Firm" }],
  openGraph: {
    title: "The Design Firm - Digital Agency",
    description: "Building digital experiences that drive success",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "The Design Firm",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Design Firm",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Design Firm - Digital Agency",
    description: "Building digital experiences that drive success",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PDF 5.1 - JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The Design Firm",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo.png`,
              description: "Building digital experiences that drive success",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Karachi",
                addressCountry: "PK",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+92-300-1234567",
                contactType: "sales",
              },
              sameAs: [
                "https://twitter.com/thedesignsfirm",
                "https://linkedin.com/company/thedesignsfirm",
                "https://facebook.com/thedesignsfirm",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
