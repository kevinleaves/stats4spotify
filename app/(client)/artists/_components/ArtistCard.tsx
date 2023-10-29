import Link from 'next/link';
import Image from 'next/image';
import ListItem from '@mui/material/ListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import classnames from 'classnames';

interface Props {
  artist: SpotifyApi.ArtistObjectFull;
}

export default function ArtistCard({ artist }: Props) {
  const {
    external_urls: { spotify: artistLink },
  } = artist;

  const maxW = artist.images[1].width;

  const imageClassName = classnames({
    [`max-w-[${maxW}px]`]: true,
    'max-h-80': true,
    // 'object-fit-contain': true,
    'w-auto': true,
  });

  return (
    <ListItem className="flex flex-col justify-between w-full" key={artist.id}>
      <div className="pb-2">
        <Image
          src={artist.images[1].url}
          alt={'spotify artist image'}
          width={320}
          height={320}
          className={imageClassName}
        />
      </div>
      <div className="min-h-16 text-lg">{artist.name}</div>
      <p className="font-thin min-h-32 text-center">
        {artist.genres.slice(0, 4).join(', ')}
      </p>
      <div className="flex justify-between gap-4">
        <div className="flex items-center font-extralight text-sm">
          popularity: {artist.popularity}
        </div>
        <Link href={artistLink} target="_blank">
          <FontAwesomeIcon className={'h-6 md:h-8'} icon={fab.faSpotify} />
        </Link>
      </div>
    </ListItem>
  );
}
