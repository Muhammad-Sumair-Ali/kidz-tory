import Providers from "@/components/resuseable/Provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: {
    default: "AI KidzTory - Interactive Stories & Educational Adventures for Children",
    template: "%s | KidzTory"
  },
  description: "Discover magical interactive stories, educational adventures, and creative learning experiences designed specifically for children. KidzTory makes reading fun and engaging with personalized storytelling.",
  keywords: [
    "children stories",
    "interactive stories",
    "kids education",
    "children books",
    "educational games",
    "storytelling for kids",
    "children learning",
    "bedtime stories",
    "kids reading",
    "educational content"
  ],
  authors: [{ name: "Muhammad Sumair" }],
  creator: "Muhammad Sumair",
  publisher: "Muhammad Sumair",
  category: "Education",
  classification: "Children's Educational Content",
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kidz-tory.vercel.app",
    siteName: "AI KidzTory",
    title: "AI KidzTory - Interactive Stories & Educational Adventures for Children",
    description: "Discover magical interactive stories and educational adventures designed specifically for children. Make reading fun and engaging!",
    images: [
      {
        url: "/images/KidztoryLogo.png", 
        width: 1200,
        height: 630,
        alt: "AI KidzTory - Interactive Stories for Children",
      },
    ],
  },

  
  // Additional metadata
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

  applicationName: "Ai KidzTory",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/app/web-app-manifest-192x192.png", sizes: "16x16", type: "image/png" },
      { url: "/app/web-app-manifest-512x512.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/app/apple-icon.png",
    shortcut: "/app/favicon.ico",
  },
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional SEO tags */}
        <link rel="canonical" href="https://kidz-tory.vercel.app" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="language" content="English" />
        <meta name="content-language" content="en-US" />
        <meta name="audience" content="children, parents, educators" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Ai KidzTory",
              "description": "Interactive stories and educational adventures for children",
              "url": "https://kidz-tory.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://kidz-tory.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Ai KidzTory",
                "logo": {
                  "@type": "ImageObject",
                  "url": "/images/KidztoryLogo.png"
                }
              }
            })
          }}
        />
      </head>
       <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NL1HX4ZV91"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NL1HX4ZV91');
          `}
        </Script>
      <body>
        <Providers>
          <Toaster 
            position="top-center"
          />
             <CookieConsent />
          {children}
        </Providers>
      </body>
    </html>
  );
}