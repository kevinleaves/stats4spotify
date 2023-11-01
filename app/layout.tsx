import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { SessionProvider } from './(providers)/SessionProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Providers from './(providers)/QueryClientProvider';
import MaterialThemeProvider from './(providers)/ThemeProvider';
import Header from './(client)/(nav)/_components/Header';
import Navbar from './(client)/(nav)/_components/Navbar';

import { authOptions } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'spotifygpt',
  description: 'use AI to discover music',
};

const links = [
  { id: 1, link: '/artists/top', label: 'Top Artists' },
  { id: 2, link: '/tracks/top', label: 'Top Tracks' },
];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <MaterialThemeProvider>
          <SessionProvider session={session}>
            <Providers>
              <main className="flex flex-col pt-0 px-4 pb-24">
                <Header>
                  <Navbar />
                </Header>
                {children}
              </main>
              <ReactQueryDevtools />
            </Providers>
          </SessionProvider>
        </MaterialThemeProvider>
      </body>
    </html>
  );
}
