import { getAccessToken } from '@/lib/spotify';

export default async function Home() {
  const session = await getAccessToken();

  return (
    <main className="flex min-h-screen flex-col justify-between p-24"></main>
  );
}
