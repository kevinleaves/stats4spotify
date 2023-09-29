import { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account) {
        // account contains the oAuth access token we want. store it in the token
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, user, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};
