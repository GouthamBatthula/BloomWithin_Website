import type { Metadata } from "next";
import "./globals.css";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: { default: "BloomWithin | Bloom Diary", template: "%s | BloomWithin" }, description: "Bloom Diary by BloomWithin — space for your everyday reflections.", alternates: { canonical: "/" }, openGraph: { type: "website", siteName: "BloomWithin", title: "BloomWithin | Bloom Diary", description: "A thoughtfully designed diary for your everyday reflections." } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
