import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { SessionProvider } from './(providers)/SessionProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Providers from './(providers)/QueryClientProvider';
import Header from './(client)/(nav)/components/Header';
import Navbar from './(client)/(nav)/components/Navbar';

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
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Providers>
            <main className="flex flex-col w-full pt-0">
              <Header>
                <Navbar>
                  <ul className="flex gap-4">
                    {links.map(({ id, link, label }) => (
                      <Link className={''} key={id} href={link}>
                        {label}
                      </Link>
                    ))}
                  </ul>
                </Navbar>
              </Header>
              {children}
            </main>
            <ReactQueryDevtools />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
