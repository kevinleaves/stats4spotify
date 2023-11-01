'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { JWT } from 'next-auth/jwt';

const baseEndpoint = 'https://api.spotify.com/v1';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function getAccessToken() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  return session;
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
  const { accessToken: token } = await getAccessToken();

  if (!token) {
    return;
  }

  try {
    const searchParams = new URLSearchParams({
      time_range: timeRange ?? 'short_term',
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
    //! getUsersTopItems returns empty because user doesn't have enough listening history to populate API call.
    if (!res.ok) {
      throw new ApiError(`Failed to fetch user's top items.`, res.status);
    }
    return res.json();
  } catch (err) {
    //! unhappy path
    console.error(err);
    if (err instanceof ApiError) {
      console.error(err.message);
      console.error(`Status Code: ${err.status}`);
    } else {
      console.error(err.message);
      console.error("An error occurred while fetching user's top items");
    }
    throw err; // Re-throw the error for further handling if needed
  }
}

export async function getTracksAudioFeatures(
  trackIDs: string
): Promise<SpotifyApi.MultipleAudioFeaturesResponse> {
  const { accessToken: token } = await getAccessToken();

  try {
    const searchParams = new URLSearchParams({
      ids: trackIDs,
    }).toString();
    const endpoint = `${baseEndpoint}/audio-features/?${searchParams}`;

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(endpoint, options);
    return response.json();
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }
}

export async function createPlaylist(timeRange) {
  // https://developer.spotify.com/documentation/web-api/reference/create-playlist
  const { accessToken: token, userId } = await getAccessToken();

  const timestamp = new Date().toDateString();

  const endpoint = `${baseEndpoint}/users/${userId}/playlists`;

  const options: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `Top Tracks ${timestamp}`,
      public: true,
      description: `Your favorite tracks ${timeRange} as of ${timestamp}. Created by spotifygpt.com`,
    }),
  };

  try {
    const response = await fetch(endpoint, options);
    return response.json();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

export async function addItemsToPlaylist(
  playlistId: string,
  uris: string[] = []
) {
  // https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist
  const { accessToken: token } = await getAccessToken();

  const endpoint = `${baseEndpoint}/playlists/${playlistId}/tracks`;

  const options: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uris,
    }),
  };

  try {
    const res = await fetch(endpoint, options);
    return res.json();
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }
}

export async function getSeveralTracks(
  trackIds: string
): Promise<SpotifyApi.MultipleTracksResponse> {
  const { accessToken: token } = await getAccessToken();

  if (!token) {
    return;
  }

  try {
    const searchParams = new URLSearchParams({
      ids: trackIds,
    }).toString();

    const endpoint = `${baseEndpoint}/tracks/?${searchParams}`;

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
