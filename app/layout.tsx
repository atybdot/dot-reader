import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/theme-provider";
import { Navbar } from "@/components/blocks/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jk-sans",
  subsets: ["latin"],
  weight: "variable",
});

const loraserif = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dot reader",
  description: "eBook / epub reader built with nextjs with synchronisations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${plusJakarta.variable} ${loraserif.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider>
            <section className="grid min-h-svh grid-rows-[auto_auto_1fr] ">
              <Navbar />
              {children}
            </section>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
