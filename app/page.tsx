import Input from './(client)/(widgets)/(input)/Input';
import AuthButton from './(client)/(auth)/components/AuthButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <>accessToken in server component: {session?.accessToken}</>
      <AuthButton />

      <Input />
    </main>
  );
}
