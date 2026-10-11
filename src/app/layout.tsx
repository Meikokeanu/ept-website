import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EPT - Outperform yourself",
  description:
    "Die Gym Tracking App mit Ranking System. Tritt gegen dich selbst an.",
  openGraph: {
    title: "EPT - Outperform yourself",
    description:
      "Die Gym Tracking App mit Ranking System. Tritt gegen dich selbst an.",
    images: [
      {
        url: "/og-image-placeholder.png",
        width: 1200,
        height: 630,
        alt: "EPT - Outperform yourself",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={inter.variable + " h-full antialiased"}>
      <body className="min-h-full flex flex-col bg-brand font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
