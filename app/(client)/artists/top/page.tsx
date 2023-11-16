import { Suspense } from 'react';
import Loading from './loading';
import ArtistList from '../_components/ArtistList';
import useUserTop from '../../tracks/_hooks/useUserTop';
import { Typography } from '@mui/material';

interface Props {
  searchParams: { timeRange: 'short_term' | 'medium_term' | 'long_term' };
}

export default async function ArtistPageWrapper(props: Props) {
  // As of Next.js 13.4.1, modifying searchParams doesn't trigger the page's file-based suspense boundary to re-fallback.
  // So to bypass that until there's a fix, we'll make our manage our own suspense boundary with params as a unique key.

  // The "dialog" search param shouldn't trigger a re-fetch
  const key = JSON.stringify({ ...props.searchParams });

  return (
    <Suspense key={key} fallback={<Loading />}>
      <ArtistPage {...props} />
    </Suspense>
  );
}

export async function ArtistPage({ searchParams }: Props) {
  const { timeRange } = searchParams;

  let headerText = 'Top Artists: last 4 weeks';

  switch (timeRange) {
    case 'short_term':
      headerText = 'Top Artists: last 4 weeks';
      break;
    case 'medium_term':
      headerText = 'Top Artists: last 6 months';
      break;
    case 'long_term':
      headerText = 'Top Artists: all time';
      break;
    default:
      break;
  }

  const { artists } = await useUserTop(timeRange, 'artists');
  // console.log(artists, 'empty artists');

  // sort method mutates original array, so we copy it
  const sorted = artists?.slice().sort((a, b) => {
    return b.popularity - a.popularity;
  });

  return (
    <main className="flex flex-col justify-center items-center gap-4 sm:max-lg:gap-8">
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
      {artists.length === 0 ? (
        <div className="flex flex-col items-center w-full sm:w-1/2">
          {`It seems that you haven't heard enough music to calculate any
          favorites from it. Try another time range or listen to some more music
          and try again later!`}
        </div>
      ) : (
        <ArtistList artists={artists} />
      )}
    </main>
  );
}
