import type { Metadata } from "next";
import {Geist_Mono,Plus_Jakarta_Sans,Lora } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/theme-provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable : "--font-jk-sans",
  subsets : ["latin"],
  weight : "variable"
})

const loraserif = Lora({
  variable : "--font-lora",
  subsets : ["latin"]
})

export const metadata:Metadata = {
  title : "dot reader",
  description : "eBook / epub reader built with nextjs with synchronisations"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${loraserif.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
