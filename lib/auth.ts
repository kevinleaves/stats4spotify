import { Awaitable, NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { refreshAccessToken } from './spotify';
import { JWT } from 'next-auth/jwt';

const scope = 'user-top-read user-read-recently-played playlist-modify-public';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
      authorization: { params: { scope } },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // this function needs to always throw back a valid token
      // if no user => access token exists but expired
      if (account && user) {
        // account contains the oAuth access token we want. store it in the token
        token.userId = user.id;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpiresAt = account.expires_at;
        // otherwise just return the original token
        return token;
      }
      // if our token has expired, refresh the token
      if (Number(token.accessTokenExpiresAt) * 1000 < Date.now()) {
        // console.log(token, 'this token is expired');
        // refresh the token
        const refreshedToken: Awaitable<JWT> = await refreshAccessToken(token);
        return refreshedToken;
      }
      return token;
    },
    async session({ session, user, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token && !token.userId) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.accessTokenExpiresAt = token.accessTokenExpiresAt;
        return session;
      }

      // our token is invalid, refresh it
      const newToken = await refreshAccessToken(token);
      session.userId = newToken?.userId;
      session.accessToken = newToken?.accessToken;
      session.refreshToken = newToken?.refreshToken;
      session.accessTokenExpiresAt = newToken?.accessTokenExpiresAt;
      return session;
    },
  },
};
