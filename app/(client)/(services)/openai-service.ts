const baseURL = '/api/openai';
import { getAccessToken } from '@/lib/spotify';

type SimplifiedTrack = {
  name: string;
  artists: string;
  album: string;
};

export const streamResponse = async (tracks: SimplifiedTrack[]) => {
  const session = await getAccessToken();
  const body = {
    tracks,
    user: session?.user.name,
  };

  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(baseURL, options);
};
