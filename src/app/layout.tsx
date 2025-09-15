import { Geist, Geist_Mono, Open_Sans } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MSeal Membership',
  description: 'M-seal membership',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${openSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
