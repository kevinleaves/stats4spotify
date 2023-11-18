import ArtistCard from './ArtistCard';

interface Props {
  artists: SpotifyApi.ArtistObjectFull[] | undefined;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedArtist: React.Dispatch<
    React.SetStateAction<SpotifyApi.ArtistObjectFull | null>
  >;
}
export default function ArtistList({
  artists,
  setIsModalOpen,
  isModalOpen,
  setSelectedArtist,
}: Props) {
  return (
    <ol className="grid grid-cols-2 md:grid-cols-3 grid-rows-3">
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
