import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./swypt.css";
import { Suspense } from 'react';
import ClientProvider from "./ClientProvider";
import '@fortawesome/fontawesome-svg-core/styles.css';
import './fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GECKHO",
  description: "GECKHO Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`} suppressHydrationWarning>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#a0b921]"></div>
        </div>}>
          <ClientProvider>{children}</ClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
