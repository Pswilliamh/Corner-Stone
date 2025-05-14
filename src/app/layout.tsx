import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppLayout from '@/components/layout/app-layout'; // Import AppLayout
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

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
  description: 'Kingdom Of Heaven Embassy Inc. - Corner Stone',
  manifest: '/manifest.json',
};

const appleTouchIconUrl = "https://cdn.discordapp.com/attachments/1260653960283099156/1267975099760836749/image.png?ex=66ab4035&is=66a9eeb5&hm=18d5959b35f4e86afbca9061ac7961b266985a0c9c649657849f4126cb70c057&";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeColor = "#2A4B7C"; // Dark Navy from globals.css primary
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Standard PWA meta tags */}
        <meta name="application-name" content="Corner Stone" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Corner Stone" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta name="msapplication-config" content="/browserconfig.xml" /> Removed as per previous step */}
        <meta name="msapplication-TileColor" content={themeColor} />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content={themeColor} />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href={appleTouchIconUrl} />
        <link rel="apple-touch-icon" sizes="152x152" href={appleTouchIconUrl} />
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIconUrl} />
        <link rel="apple-touch-icon" sizes="167x167" href={appleTouchIconUrl} />
        
        {/* Favicon links (optional, but good practice) - you'd need to create these icons */}
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" /> */}
        {/* <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" /> */}
        {/* <link rel="shortcut icon" href="/favicon.ico" /> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>
        <AppLayout>
          {children}
        </AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
