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
  title: 'stats4spotify',
  description:
    'view your top tracks, artists, and recently played songs to explore your Spotify listening habits',
};

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
