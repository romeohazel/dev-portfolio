import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AmbientProvider } from "@/hooks/useAmbient";

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
    <html lang="en">
      <body>
        <AmbientProvider>{children}</AmbientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
