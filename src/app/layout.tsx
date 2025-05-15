
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppLayout from '@/components/layout/app-layout';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Corner Stone',
  description: 'Identify rocks, describe items, and explore their biblical significance.',
  manifest: '/manifest-cornerstone.json', // Using a distinct manifest
};

const themeColor = "#D4AF37"; // Gold, approximating --primary

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="application-name" content="Corner Stone" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Corner Stone" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content={themeColor} />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content={themeColor} />
        <link rel="manifest" href="/manifest-cornerstone.json" />
        {/* 
          Placeholder for actual icons. Create these in public/icons/cornerstone/
          <link rel="apple-touch-icon" href="/icons/cornerstone/apple-touch-icon.png" /> 
          <link rel="shortcut icon" href="/icons/cornerstone/favicon.ico" /> 
        */}
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <AppLayout>
          {children}
        </AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
