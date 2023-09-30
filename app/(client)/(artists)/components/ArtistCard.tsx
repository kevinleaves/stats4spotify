import Image from 'next/image';
interface Props {
  artist: SpotifyApi.ArtistObjectFull;
}

export default function ArtistCard(artist: SpotifyApi.ArtistObjectFull) {
  return (
    <div className="border-2 border-red-500 rounded-lg">
      <div>id: {artist.id}</div>
      <div>{artist.name}</div>
      <div>{artist.popularity}</div>
      <div>{JSON.stringify(artist.genres)}</div>
      <div>{JSON.stringify(artist.images)}</div>
      <Image
        src={artist.images[1].url}
        alt={'spotify artist image'}
        width={320}
        height={320}
      />
    </div>
  );
}
