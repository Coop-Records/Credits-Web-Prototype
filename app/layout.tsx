import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PrivyProvider from "@/providers/PrivyProvider";
import { CrossmintProvider } from "@/providers/CrossmintProvider";
import { WalletProvider } from "@/providers/WalletProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coop Credit Top Up",
  description: "Each song costs 1 credit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CrossmintProvider>
        <PrivyProvider>
          <WalletProvider>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              {children}
            </body>
          </WalletProvider>
        </PrivyProvider>
      </CrossmintProvider>
    </html>
  );
}
