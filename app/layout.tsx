import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display, Great_Vibes, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { birthdayData } from "@/data/birthday";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
  weight: ["400"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#5A0F1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${birthdayData.mainGreeting.title} ${birthdayData.recipient.name} ♡ | A Midnight Garden For You`,
  description: `A personal cinematic birthday gift website crafted with love for ${birthdayData.recipient.name}.`,
  authors: [{ name: "With Love" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`scroll-smooth ${playfair.variable} ${cormorant.variable} ${greatVibes.variable} ${jakarta.variable}`}
    >
      <body className="bg-burgundy-night text-cream-light font-sans antialiased overflow-x-hidden selection:bg-crimson selection:text-cream-light">
        {children}
      </body>
    </html>
  );
}
