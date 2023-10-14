import { getAccessToken } from '@/lib/spotify';
import Chat from './(client)/(widgets)/(input)/Chat';

export default async function Home() {
  const session = await getAccessToken();

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <Chat />
    </main>
  );
}
