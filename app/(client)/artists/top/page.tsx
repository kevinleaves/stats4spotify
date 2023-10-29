import { Suspense } from 'react';
import Loading from './loading';
import ArtistList from '../_components/ArtistList';
import useUserTop from '../../tracks/_hooks/useUserTop';

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

  const { artists } = await useUserTop(timeRange, 'artists');

  // sort method mutates original array, so we copy it
  const sorted = artists?.slice().sort((a, b) => {
    return b.popularity - a.popularity;
  });

  return <ArtistList artists={artists} />;
}
