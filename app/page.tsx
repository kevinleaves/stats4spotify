import Image from 'next/image';
import Input from './(client)/(widgets)/(input)/Input';
import AuthButton from './(client)/(auth)/components/AuthButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <h1>hi</h1>
      <AuthButton />

      <Input />
    </main>
  );
}
