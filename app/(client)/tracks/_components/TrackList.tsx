'use client';
import { motion, AnimatePresence } from 'framer-motion';
import TrackView from './TrackView';

interface Props {
  tracks: SpotifyApi.TrackObjectFull[] | undefined;
}

export default function TrackList({ tracks }: Props) {
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
      <ul className="flex flex-col gap-4 px-4 max-h-96 overflow-y-auto">
        {tracks?.map((track, index) => (
          <motion.li
            key={track.id}
            className="flex gap-4 items-center"
            variants={variants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <TrackView
              track={track}
              index={index}
              thumbnailHeight={80}
              thumbnailWidth={80}
              showTempo={false}
            />
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  );
}
