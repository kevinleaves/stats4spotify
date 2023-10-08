import LinkList from '../../(common)/components/LinkList';

interface Link {
  id: number;
  param: 'short_term' | 'medium_term' | 'long_term';
  label: 'last 4 weeks' | 'last 6 months' | 'all time';
}

const links: Link[] = [
  { id: 1, param: 'short_term', label: 'last 4 weeks' },
  { id: 2, param: 'medium_term', label: 'last 6 months' },
  { id: 3, param: 'long_term', label: 'all time' },
];

export default async function TracksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav className="flex justify-center p-4">
        <LinkList links={links} baseUrl={'/tracks/top/?timeRange='} />
      </nav>
      {children}
    </section>
  );
}
