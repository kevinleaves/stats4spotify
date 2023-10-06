import TrackLinks from '../../(nav)/components/TrackLinks';
export default async function TracksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav className="flex justify-center p-4">
        <TrackLinks />
      </nav>
      {children}
    </section>
  );
}
