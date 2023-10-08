'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  tracks: SpotifyApi.TrackObjectFull[];
}

export default function TrackList({ tracks }: Props) {
  const getArtistString = (artists: SpotifyApi.ArtistObjectSimplified[]) => {
    const artistNames = artists.map((artist) => artist.name);
    return artistNames.join(', ');
  };

  const variants = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.025,
      },
    }),
    hidden: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      <ul className="flex flex-col gap-4">
        {tracks.map((track, index) => (
          <motion.li
            key={track.id}
            className="flex gap-4"
            variants={variants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <p className="font-bold text-md self-center">{index + 1}</p>
            <Image
              src={track.album.images[1].url}
              alt="a track image"
              width={50}
              height={50}
              className="rounded-xl w-24"
            />
            <div className="flex justify-between w-full">
              <div className="flex-col mr-">
                <p className="text-xl font-semibold">{track.name}</p>
                <p className="font-extralight">
                  {getArtistString(track.artists)}
                </p>
                <p className="font-extralight">
                  BPM/Tempo: {Math.round(track.tempo)}
                </p>
              </div>
              <Link href={track.uri} target="_blank">
                <FontAwesomeIcon className={'h-8'} icon={fab.faSpotify} />
              </Link>
            </div>
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  );
}
