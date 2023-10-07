'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        not signed in <br />
        <button onClick={() => signIn()}>sign in</button>
      </>
    );
  }

  const { user, accessToken } = session;

  return (
    <>
      {/* <Image src={user.image} width={50} height={50} /> */}
      <button
        onClick={() => {
          signOut({ callbackUrl: '/' });
        }}
      >
        sign out
      </button>
    </>
  );
}
