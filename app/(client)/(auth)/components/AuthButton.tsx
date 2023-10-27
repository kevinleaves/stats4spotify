'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <button className={'sm:inline sm:w-20'} onClick={() => signIn()}>
          Sign in
        </button>
      </>
    );
  }

  const { user, accessToken } = session;

  return (
    <>
      <button
        onClick={() => {
          signOut({ callbackUrl: '/' });
        }}
        className={'sm:inline sm:w-20'}
      >
        Sign out
      </button>
    </>
  );
}
