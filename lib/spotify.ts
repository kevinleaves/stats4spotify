'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const baseEndpoint = 'https://api.spotify.com/v1';

export async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }
  const accessToken = session.accessToken;
  return accessToken;
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
  }
}
