'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import getArtistString from '@/lib/utils/getArtistString';

interface Props {
  track: SpotifyApi.TrackObjectFull;
  index: number;
  thumbnailHeight: number;
  thumbnailWidth: number;
  showTempo?: boolean;
}

export default function TrackView({
  track,
  index,
  thumbnailHeight,
  thumbnailWidth,
  showTempo,
}: Props) {
  return (
    <>
      <p className="font-bold text-md self-center w-8">{index + 1}</p>
      <Image
        src={track.album.images[1].url}
        alt="a track image"
        width={thumbnailWidth}
        height={thumbnailHeight}
      />
      <div className="flex justify-between w-full gap-2 items-center">
        <div className="flex flex-col">
          <p className="text-sm md:text-lg font-semibold">{track.name}</p>
          <p className="text-xs md:text-base font-extralight">
            {getArtistString(track.artists)}
          </p>
          {showTempo ? (
            <p className="text-xs md:text-base font-extralight">
              BPM/Tempo: {Math.round(track.tempo)}
            </p>
          ) : null}
        </div>
        <Link href={track.uri} target="_blank">
          <FontAwesomeIcon className={'h-8'} icon={fab.faSpotify} />
        </Link>
      </div>
    </>
  );
}
