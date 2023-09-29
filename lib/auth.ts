import { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const scope =
  'user-top-read user-read-recently-played user-read-playback-position playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify';

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
      if (account) {
        // account contains the oAuth access token we want. store it in the token
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, user, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.accessTokenExpiresAt = token.accessTokenExpiresAt;
      }
      return session;
    },
  },
};
