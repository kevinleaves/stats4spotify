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
    <ListItem className="flex flex-col justify-between" key={artist.id}>
      <div className="pb-2">
        <Image
          src={artist.images[1].url}
          alt={'spotify artist image'}
          width={320}
          height={320}
          className="max-h-80 object-cover rounded-md"
        />
      </div>
      <div className="min-h-16 text-lg">{artist.name}</div>
      <p className="font-thin min-h-32 text-center">
        {artist.genres.slice(0, 4).join(', ')}
      </p>
      <div className="flex justify-between items-end gap-4">
        <div className="font-extralight">popularity: {artist.popularity}</div>
        <Link href={artistLink} target="_blank">
          <FontAwesomeIcon className={'h-8'} icon={fab.faSpotify} />
        </Link>
      </div>
    </ListItem>
  );
}
