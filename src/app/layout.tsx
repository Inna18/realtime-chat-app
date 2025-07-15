'use client';
import { Montserrat } from 'next/font/google';
import './globals.css';

import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';
import { useEffect } from 'react';

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
  useEffect(() => {
    console.log('AuthLayout mounted'); // in (auth)/layout.tsx
  }, []);
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`}>
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
