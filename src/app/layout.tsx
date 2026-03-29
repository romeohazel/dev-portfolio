import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AmbientProvider } from "@/hooks/useAmbient";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Romeo Hazel — Developer Portfolio",
  description:
    "Shipped from obsession. Built to matter. Full stack developer, CSUDH, incoming SWE intern at Meta.",
  openGraph: {
    title: "Romeo Hazel — Developer Portfolio",
    description: "Shipped from obsession. Built to matter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Romeo Hazel",
              jobTitle: "Full Stack Developer",
              url: "https://romeohazel.com",
              sameAs: [
                "https://www.linkedin.com/in/romeohazel/",
                "https://github.com/romeohazel",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "California State University, Dominguez Hills",
              },
            }),
          }}
        />
      </head>
      <body>
        <AmbientProvider>{children}</AmbientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
