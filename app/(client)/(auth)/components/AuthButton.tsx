'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
  const { data: session } = useSession();
  console.log(session, 'session');
  const { accessToken } = session;

  if (!session) {
    return (
      <>
        not signed in <br />
        <button onClick={() => signIn()}>sign in</button>
      </>
    );
  }

  return (
    <>
      {/* Access token: {accessToken} */}
      <button onClick={() => signOut()}>sign out</button>
    </>
  );
}
