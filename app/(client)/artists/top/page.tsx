import { getAccessToken, getUsersTopItems } from '@/lib/spotify';

import AuthButton from '../../(auth)/components/AuthButton';
import ArtistList from '../components/ArtistList';

interface Props {
  searchParams: { timeRange: 'short_term' | 'medium_term' | 'long_term' };
}

export default async function ArtistPage({ searchParams }: Props) {
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

  return <ArtistList artists={artists} />;
}
