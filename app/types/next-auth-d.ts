import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {} & DefaultSession['user'];
    /** Oauth access token */
    accessToken?: accessToken;
    refreshToken?: refreshToken;
    accessTokenExpiresAt?: accessTokenExpiresAt;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiresAt?: number;
  }
}
