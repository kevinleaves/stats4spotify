'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { JWT } from 'next-auth/jwt';

const baseEndpoint = 'https://api.spotify.com/v1';

export async function getAccessToken() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const accessToken = session.accessToken;
  return accessToken;
}

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const url = 'https://accounts.spotify.com/api/token';
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
    };

    const response = await fetch(url, options);
    const refreshedTokens = await response.json();
    // console.log(refreshedTokens, 'refreshedTokens');
    // we have a refreshed token, send back a token in the same shape as the original, but with updated timestamps
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpiresAt: Date.now() + refreshedTokens.expires_in * 1000,
    };
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

// this is an example of a server action
export async function getUsersTopItems(
  type: 'artists' | 'tracks',
  timeRange: 'short_term' | 'medium_term' | 'long_term',
  limit: number
) {
  const token = await getAccessToken();

  if (!token) {
    return;
  }

  try {
    const searchParams = new URLSearchParams({
      time_range: timeRange,
      limit,
      offset: 0,
    }).toString();

    const endpoint = `${baseEndpoint}/me/top/${type}?${searchParams}`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(endpoint, options);
    return res.json();
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}
