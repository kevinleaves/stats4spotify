import { getAccessToken } from '@/lib/spotify';
import Input from './(client)/(widgets)/(input)/Input';

export default async function Home() {
  const session = await getAccessToken();

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <Input />
    </main>
  );
}
