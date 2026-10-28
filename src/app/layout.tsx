import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { content } from '@/content';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: content.studio.metaTitle,
  description: content.studio.metaDescription,
  authors: [{ name: content.studio.founder }],
  keywords: [
    'AI automation Jaipur',
    'AI agents India',
    'autonomous business engineering',
    'Tally WhatsApp automation',
    'ERP AI connectors',
  ],
  openGraph: {
    title: content.studio.metaTitle,
    description: content.studio.metaDescription,
    url: 'https://seven3.ai',
    siteName: content.studio.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: content.studio.metaTitle,
    description: content.studio.metaDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-frame text-ink font-sans antialiased selection:bg-accent selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
