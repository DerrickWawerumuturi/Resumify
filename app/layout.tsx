import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"
import {
  ClerkProvider
} from '@clerk/nextjs'
import "./globals.css"
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner"
import '@smastrom/react-rating/style.css'

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ai Resume builder",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${fontSans.variable} antialiased`}>
          <Header />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
