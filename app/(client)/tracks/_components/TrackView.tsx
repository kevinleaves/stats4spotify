'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import getArtistString from '@/lib/utils/getArtistString';
import { Button } from '@/components/ui/button';

interface Props {
  track: SpotifyApi.TrackObjectFull;
  index: number;
  showTempo?: boolean;
  variant: 'compact' | 'default';
}

export default function TrackView({
  track,
  index,
  showTempo,
  variant = 'default',
}: Props) {
  const TRACK_VIEW_VARIANTS = {
    default: {
      trackName: 'text-sm md:text-lg font-semibold',
      artistName: 'text-xs md:text-base font-extralight',
      thumbnailHeight: 80,
      thumbnailWidth: 80,
      iconSize: 'h-8',
    },
    compact: {
      trackName: 'text-xs md:text-base font-semibold',
      artistName: 'text-xs md:text-base font-extralight',
      thumbnailHeight: 40,
      thumbnailWidth: 40,
      iconSize: 'h-6',
    },
  };
  return (
    <>
      <p className="font-bold text-md self-center w-8">{index + 1}</p>
      <Image
        src={track.album.images[1].url}
        alt="spotify track image"
        width={TRACK_VIEW_VARIANTS[variant]['thumbnailWidth']}
        height={TRACK_VIEW_VARIANTS[variant]['thumbnailHeight']}
      />
      <div className="flex justify-between w-full gap-2 items-center">
        <div className="flex flex-col">
          <p className={TRACK_VIEW_VARIANTS[variant]['trackName']}>
            {track.name}
          </p>
          <p className={TRACK_VIEW_VARIANTS[variant]['artistName']}>
            {getArtistString(track.artists)}
          </p>
          {showTempo ? (
            <p className="text-xs md:text-base font-extralight">
              BPM/Tempo: {Math.round(track.tempo)}
            </p>
          ) : null}
        </div>
      </div>
      <Button role="listitem" asChild>
        <Link href={track.uri} target="_blank">
          <FontAwesomeIcon
            className={TRACK_VIEW_VARIANTS[variant]['iconSize']}
            icon={fab.faSpotify}
            tabIndex={0} // adds tab navigation for spotify links
          />
        </Link>
      </Button>
    </>
  );
}
