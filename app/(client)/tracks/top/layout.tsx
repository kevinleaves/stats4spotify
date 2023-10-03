import Link from 'next/link';
export default async function TracksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    { id: 1, param: 'short_term', label: 'last 4 weeks' },
    { id: 2, param: 'medium_term', label: 'last 6 months' },
    { id: 3, param: 'long_term', label: 'all time' },
  ];

  return (
    <section>
      <nav className="flex justify-center p-4">
        <ul className="flex gap-4">
          {links.map(({ id, param, label }) => (
            <Link key={id} href={`/tracks/top/?timeRange=${param}`}>
              {label}
            </Link>
          ))}
        </ul>
      </nav>
      {children}
    </section>
  );
}
