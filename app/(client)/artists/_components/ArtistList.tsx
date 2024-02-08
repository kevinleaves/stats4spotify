import ArtistCard from './ArtistCard';

interface ArtistListProps {
  artists: SpotifyApi.ArtistObjectFull[] | undefined;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedArtist: React.Dispatch<
    React.SetStateAction<SpotifyApi.ArtistObjectFull | null>
  >;
  variant: 'expanded' | 'condensed';
}
const ARTIST_LIST_VARIANTS = {
  expanded: `grid grid-cols-2 md:grid-cols-6 `,
  condensed: `grid grid-cols-2 md:grid-cols-3 `,
};

export default function ArtistList({
  artists,
  setIsModalOpen,
  isModalOpen,
  setSelectedArtist,
  variant,
}: ArtistListProps) {
  if (artists?.length === 0) {
    return (
      <div className="flex flex-col items-center w-full sm:w-1/2">
        {`It seems that you haven't heard enough music to calculate any
    favorites from it. Try another time range or listen to some more music
    and try again later!`}
      </div>
    );
  }

  return (
    <ol className={ARTIST_LIST_VARIANTS[variant]}>
      {artists?.map((artist) => (
        <ArtistCard
          key={artist.id}
          artist={artist}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          setSelectedArtist={setSelectedArtist}
        />
      ))}
    </ol>
  );
}
