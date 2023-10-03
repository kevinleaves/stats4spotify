import Link from 'next/link';
export default async function TracksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = ['short_term', 'medium_term', 'long_term'];

  return (
    <div>
      <nav className="flex gap-4">
        {links.map((link) => (
          <Link href={`/tracks/top/?timeRange=${link}`}>{link}</Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
