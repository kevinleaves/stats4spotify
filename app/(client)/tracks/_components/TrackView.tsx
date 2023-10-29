'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';

interface Props {
  track: SpotifyApi.TrackObjectFull;
  index: number;
}

const getArtistString = (artists: SpotifyApi.ArtistObjectSimplified[]) => {
  const artistNames = artists.map((artist) => artist.name);
  return artistNames.join(', ');
};

export default function TrackView({ track, index }: Props) {
  return (
    <>
      <p className="font-bold text-md self-center">{index + 1}</p>
      <Image
        src={track.album.images[1].url}
        alt="a track image"
        width={50}
        height={50}
        className="w-20 h-20"
      />
      <div className="flex justify-between w-full gap-2 items-center">
        <div className="flex flex-col">
          <p className="text-md md:text-xl font-semibold">{track.name}</p>
          <p className="text-sm md:text-lg font-extralight">
            {getArtistString(track.artists)}
          </p>
          <p className="text-sm md:text-lg font-extralight">
            BPM/Tempo: {Math.round(track.tempo)}
          </p>
        </div>
        <Link href={track.uri} target="_blank">
          <FontAwesomeIcon className={'h-8'} icon={fab.faSpotify} />
        </Link>
      </div>
    </>
  );
}
