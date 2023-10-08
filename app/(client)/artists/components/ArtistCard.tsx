import Link from 'next/link';
import Image from 'next/image';
import ListItem from '@mui/material/ListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';

interface Props {
  artist: SpotifyApi.ArtistObjectFull;
}

export default function ArtistCard({ artist }: Props) {
  const {
    external_urls: { spotify: artistLink },
  } = artist;
  return (
    <ListItem className="flex flex-col" key={artist.id}>
      <div className="">
        <Image
          src={artist.images[1].url}
          alt={'spotify artist image'}
          width={320}
          height={320}
          className="max-h-80 object-contain"
        />
      </div>
      {/* <div>id: {artist.id}</div> */}
      <div>{artist.name}</div>
      {/* <div>{JSON.stringify(artist.genres)}</div> */}
      {/* <div>{JSON.stringify(artist.images)}</div> */}
      <ul className="flex gap-2">
        {artist.genres.map((genre) => (
          <li className="font-extralight">{genre}</li>
        ))}
      </ul>
      <div className="flex justify-between gap-4">
        <div className="font-extralight">popularity: {artist.popularity}</div>
        <Link href={artistLink} target="_blank">
          <FontAwesomeIcon className={'h-8'} icon={fab.faSpotify} />
        </Link>
      </div>
    </ListItem>
  );
}
