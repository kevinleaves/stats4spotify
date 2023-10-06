import Input from './(client)/(widgets)/(input)/Input';
import { getAccessToken } from '@/lib/spotify';

export default async function Home() {
  const session = await getAccessToken();

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col justify-between p-24">
        <p>No Session Found</p>
      </main>
    );
  }

  const { accessToken: token } = session;

  if (!token) {
    return (
      <main className="flex min-h-screen flex-col justify-between p-24">
        <p>No Token Found</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      {/* <>accessToken in server component: {token}</> */}
      <Input />
    </main>
  );
}
