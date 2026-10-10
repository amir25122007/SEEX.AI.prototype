import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { brandFontFaces } from "@/lib/brandFonts";
import { fontVariables } from "@/lib/fonts";
import { ALLOW_INDEXING, site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  robots: ALLOW_INDEXING ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SeexAI — презентация за пару минут" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
};

/**
 * Desktop-only page: phones render it as a scaled-down 1440px desktop
 * instead of a cropped layout (there is no mobile design).
 */
export const viewport: Viewport = {
  width: 1440,
  themeColor: "#101010",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const fontFaces = brandFontFaces();
  return (
    <html lang="ru" className={fontVariables}>
      <head>{fontFaces ? <style dangerouslySetInnerHTML={{ __html: fontFaces }} /> : null}</head>
      <body>{children}</body>
    </html>
  );
}
