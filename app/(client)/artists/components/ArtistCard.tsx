import Image from 'next/image';
import ListItem from '@mui/material/ListItem';

interface Props {
  artist: SpotifyApi.ArtistObjectFull;
}

export default function ArtistCard({ artist }: Props) {
  return (
    <ListItem className="flex flex-col" key={artist.id}>
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
    </ListItem>
  );
}
