'use client';

import Link from 'next/link';
import Image from 'next/image';
import ListItem from '@mui/material/ListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import classnames from 'classnames';

interface Props {
  artist: SpotifyApi.ArtistObjectFull;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setSelectedArtist: React.Dispatch<
    React.SetStateAction<SpotifyApi.ArtistObjectFull | null>
  >;
}

export default function ArtistCard({
  artist,
  setIsModalOpen,
  isModalOpen,
  setSelectedArtist,
}: Props) {
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
    <ListItem
      className="flex flex-col justify-between w-full hover:bg-slate-400"
      key={artist.id}
      onClick={() => {
        setIsModalOpen(true);
        setSelectedArtist(artist);
      }}
    >
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
