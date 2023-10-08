import { Suspense } from 'react';
import { getAccessToken, getUsersTopItems } from '@/lib/spotify';
import Loading from './loading';
import AuthButton from '../../(auth)/components/AuthButton';
import ArtistList from '../components/ArtistList';

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
  const { accessToken: token } = await getAccessToken();

  const { timeRange } = searchParams;

  if (!token) {
    return (
      <main className="flex min-h-screen flex-col justify-between p-24">
        <p>No Token Found</p>
        <AuthButton />
      </main>
    );
  }
  const response = await getUsersTopItems('artists', timeRange, 50);

  const { items: artists }: { items: SpotifyApi.ArtistObjectFull[] } = response;

  // sort method mutates original array, so we copy it
  const sorted = [...artists].sort((a, b) => {
    return b.popularity - a.popularity;
  });

  return (
    // <main className="flex">
    <ArtistList artists={artists} />
    // </main>
  );
}
