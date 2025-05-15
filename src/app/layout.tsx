
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
  description: 'Explore geology, biblical insights, and describe items with AI. Powered by Kingdom Of Heaven Embassy Inc.',
  manifest: '/manifest-cornerstone.json', // Ensure this manifest is tailored for Corner Stone
};

const themeColor = "#DAA520"; // Gold, approximating --primary

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
        {/* Use a relevant logo for Corner Stone / KOHE */}
        <link rel="apple-touch-icon" href="https://cdn.discordapp.com/attachments/1221284005090955378/1239930093903872080/KOHENAVYLGLSM.png?ex=6644b393&is=66436213&hm=5c9f0b0760733071e9608616704d0007715784098385a8401c209f98e1b6512a&" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content={themeColor} />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content={themeColor} />
        <link rel="manifest" href="/manifest-cornerstone.json" />
        {/* 
          Consider creating specific icons for Corner Stone in public/icons/cornerstone/
          e.g. <link rel="shortcut icon" href="/icons/cornerstone/favicon.ico" /> 
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
