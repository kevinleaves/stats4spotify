import { Suspense } from 'react';
import Loading from './loading';
import TrackList from '../_components/TrackList';
import ExportPlaylistButton from '../_components/ExportPlaylistButton';
import useUserTop from '../_hooks/useUserTop';
import { Typography } from '@mui/material';
import getArtistString from '@/lib/utils/getArtistString';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { OpenInNewWindowIcon } from '@radix-ui/react-icons';

interface Props {
  params: { slug: string };
  searchParams: { timeRange: 'short_term' | 'medium_term' | 'long_term' };
}

export default async function TracksPageWrapper(props: Props) {
  // As of Next.js 13.4.1, modifying searchParams doesn't trigger the page's file-based suspense boundary to re-fallback.
  // So to bypass that until there's a fix, we'll make our manage our own suspense boundary with params as a unique key.

  // The "dialog" search param shouldn't trigger a re-fetch
  const key = JSON.stringify({ ...props.searchParams });

  return (
    <Suspense key={key} fallback={<Loading />}>
      <TracksPage {...props} />
    </Suspense>
  );
}

export async function TracksPage({ searchParams }: Props) {
  const { timeRange } = searchParams;

  let timeRangeSuffix = '';

  switch (timeRange) {
    case 'short_term':
      timeRangeSuffix = 'last 4 weeks';
      break;
    case 'medium_term':
      timeRangeSuffix = 'last 6 months';
      break;
    case 'long_term':
      timeRangeSuffix = 'all time';
      break;
    default:
      break;
  }

  let headerText = `Top Tracks: ${timeRangeSuffix}`;

  const { tracks, trackUris } = await useUserTop(timeRange, 'tracks');

  const simplifiedTracks = tracks?.map((track) => ({
    name: track.name,
    artists: getArtistString(track.artists),
    album: track.album.name,
  }));

  return (
    <main className="flex flex-col justify-center items-center gap-4 sm:max-lg:gap-8">
      {tracks?.length === 0 ? (
        <div className="w-full sm:w-1/2">
          {`It seems that you haven't heard enough music to calculate any
          favorites from it. Try another time range or listen to some more music
          and try again later!`}
        </div>
      ) : (
        <>
          <Dialog>
            <DialogTrigger>
              <Button>
                View List &nbsp; <OpenInNewWindowIcon />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <Typography
                    variant="h2"
                    sx={{
                      '@media (min-width: 1024px)': {
                        fontSize: '1.875rem',
                        lineHeight: '2.25rem',
                      },
                      fontSize: '1.125rem',
                      lineHeight: '1.75rem',
                      fontWeight: 700,
                      letterSpacing: '-0.05em',
                    }}
                  >
                    {headerText}
                  </Typography>
                </DialogTitle>
                <DialogDescription>
                  Your most played tracks: {timeRangeSuffix}
                </DialogDescription>
              </DialogHeader>
              <TrackList
                tracks={tracks}
                trackViewVariant="compact"
                variant="default"
              />
              <DialogFooter className="flex sm:justify-center">
                <ExportPlaylistButton
                  headerText={headerText}
                  uris={trackUris}
                />
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Typography
            variant="h2"
            sx={{
              '@media (min-width: 1024px)': {
                fontSize: '1.875rem',
                lineHeight: '2.25rem',
              },
              fontSize: '1.125rem',
              lineHeight: '1.75rem',
              fontWeight: 700,
              letterSpacing: '-0.05em',
            }}
          >
            {headerText}
          </Typography>
          <TrackList
            tracks={tracks}
            trackViewVariant="compact"
            variant="compact"
          />
          <ExportPlaylistButton headerText={headerText} uris={trackUris} />
        </>
      )}
    </main>
  );
}
