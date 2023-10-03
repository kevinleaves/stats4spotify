import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from './(providers)/SessionProvider';
import { getServerSession } from 'next-auth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Providers from './(providers)/QueryClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'spotifygpt',
  description: 'use AI to discover music',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Providers>
            <main>{children}</main>
            <ReactQueryDevtools />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
