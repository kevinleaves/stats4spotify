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
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.image}</div>
      {/* <div>accessToken via session: {accessToken}</div> */}
      <button onClick={() => signOut()}>sign out</button>
    </>
  );
}
