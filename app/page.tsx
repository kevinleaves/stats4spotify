import Input from './(client)/(widgets)/(input)/Input';
import AuthButton from './(client)/(auth)/components/AuthButton';
import { getAccessToken, getUsersTopItems } from '@/lib/spotify';

export default async function Home() {
  const token = getAccessToken();
  const response = await getUsersTopItems('artists', 'short_term', 50);
  console.log(response, 'response');

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <>accessToken in server component: {token}</>
      <AuthButton />
      <Input />
    </main>
  );
}
