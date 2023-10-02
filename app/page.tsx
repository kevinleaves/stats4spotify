import Input from './(client)/(widgets)/(input)/Input';
import AuthButton from './(client)/(auth)/components/AuthButton';
import { getAccessToken, getUsersTopItems } from '@/lib/spotify';
import ArtistCard from './(client)/(artists)/components/ArtistCard';

export default async function Home() {
  const token = await getAccessToken();
  //TODO: edit guard clause to handle invalid token/or refresh the token
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

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <>accessToken in server component: {token}</>
      {/* <>{JSON.stringify(items)}</> */}
      <ol className="border-2 border-white rounded-lg">
        {sorted.map((artist) => ArtistCard(artist))}
      </ol>
      <AuthButton />
      <Input />
    </main>
  );
}
