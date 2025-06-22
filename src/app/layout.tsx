'use client';
import { Montserrat } from 'next/font/google';
import './globals.css';

import { SessionProvider } from 'next-auth/react';

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
