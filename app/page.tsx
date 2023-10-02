import Input from './(client)/(widgets)/(input)/Input';
import AuthButton from './(client)/(auth)/components/AuthButton';
import { getAccessToken } from '@/lib/spotify';

export default async function Home() {
  const token = await getAccessToken();
  if (!token) {
    return (
      <main className="flex min-h-screen flex-col justify-between p-24">
        <p>No Token Found</p>
        <AuthButton />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <>accessToken in server component: {token}</>
      <AuthButton />
      <Input />
    </main>
  );
}
