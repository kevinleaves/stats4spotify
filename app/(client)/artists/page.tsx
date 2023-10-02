import { getAccessToken, getUsersTopItems } from '@/lib/spotify';

import AuthButton from '../(auth)/components/AuthButton';
import ArtistList from './components/ArtistList';

interface Props {}

export default async function ArtistPage({}: Props) {
  const token = await getAccessToken();
  console.log(token, 'token');
  if (!token) {
    return (
      <main className="flex min-h-screen flex-col justify-between p-24">
        <p>No Token Found</p>
        <AuthButton />
      </main>
    );
  }
  const response = await getUsersTopItems('artists', 'short_term', 50);

  const { items }: { items: SpotifyApi.ArtistObjectFull[] } = response;

  const sorted = items.sort((a, b) => {
    return b.popularity - a.popularity;
  });

  return <ArtistList artists={sorted} />;
}
