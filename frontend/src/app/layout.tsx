import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ 
    subsets: ["latin"],
    display: 'swap',
});

// PDF 5.1 - Dynamic Meta Tags
export const metadata: Metadata = {
    title: {
        default: "Nexora - Digital Agency",
        template: "%s | Nexora"
    },
    description: "Building digital experiences that drive success. We are a creative digital agency helping businesses grow.",
    keywords: ["digital agency", "web development", "mobile apps", "UI/UX design", "digital marketing"],
    authors: [{ name: "Nexora" }],
    openGraph: {
        title: "Nexora - Digital Agency",
        description: "Building digital experiences that drive success",
        url: process.env.NEXT_PUBLIC_SITE_URL,
        siteName: "Nexora",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Nexora - Digital Agency",
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
    // PDF 5.1 - Canonical URL
    alternates: {
        canonical: process.env.NEXT_PUBLIC_SITE_URL,
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
                            "name": "Nexora",
                            "url": process.env.NEXT_PUBLIC_SITE_URL,
                            "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
                            "description": "Building digital experiences that drive success",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Karachi",
                                "addressCountry": "PK"
                            },
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+92-300-1234567",
                                "contactType": "sales"
                            },
                            "sameAs": [
                                "https://twitter.com/nexora",
                                "https://linkedin.com/company/nexora",
                                "https://facebook.com/nexora"
                            ]
                        })
                    }}
                />
            </head>
            <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}