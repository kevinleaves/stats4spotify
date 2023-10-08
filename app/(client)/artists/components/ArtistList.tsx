// VIEW COMPONENT

import ArtistCard from './ArtistCard';

interface Props {
  artists: SpotifyApi.ArtistObjectFull[];
}

export default function ArtistList({ artists }: Props) {
  return (
    <ol className="grid grid-cols-3 grid-rows-3">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </ol>
  );
}
