'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
export default function AuthButton() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <Button
          className={'sm:inline  items-start'}
          onClick={() => signIn(undefined, { callbackUrl: '/tracks/top' })}
          variant={'outline'}
        >
          Sign in
        </Button>
      </>
    );
  }

  return (
    <Button
      onClick={() => {
        signOut({ callbackUrl: '/' });
      }}
      className={'sm:inline  items-start'}
      variant={'outline'}
    >
      Sign out
    </Button>
  );
}
