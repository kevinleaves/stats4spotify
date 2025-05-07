'use client';
import { motion, AnimatePresence } from 'framer-motion';
import TrackView from './TrackView';

interface TrackListProps {
  tracks: SpotifyApi.TrackObjectFull[] | undefined;
  trackViewVariant: 'default' | 'compact';
  variant: 'default' | 'compact';
}

export default function TrackList({
  tracks,
  trackViewVariant = 'default',
  variant = 'default',
}: TrackListProps) {
  const variants = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.025,
      },
    }),
    hidden: { opacity: 0 },
  };

  const TRACK_LIST_VARIANTS = {
    default: `flex flex-col gap-4 px-4 max-h-[80vh] overflow-y-auto w-full`,
    compact: `flex flex-col gap-4 px-4 max-h-[80vh] w-3/4 overflow-y-auto`,
  };

  return (
    <AnimatePresence>
      <ul className={TRACK_LIST_VARIANTS[variant]} role="list">
        {tracks?.map((track, index) => (
          <motion.li
            key={track.id}
            className="flex gap-4 items-center"
            variants={variants}
            initial="hidden"
            animate="visible"
            custom={index}
            role="listitem"
          >
            <TrackView
              track={track}
              index={index}
              showTempo={false}
              variant={trackViewVariant}
            />
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  );
}
