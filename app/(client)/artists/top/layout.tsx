import AlbumLinks from '../../(nav)/components/AlbumLinks';
export default async function TracksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav className="flex justify-center p-4">
        <AlbumLinks />
      </nav>
      {children}
    </section>
  );
}
