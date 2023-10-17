const baseURL = '/api/openai';

type SimplifiedTrack = {
  name: string;
  artists: string;
  album: string;
};

export const streamResponse = async (tracks: SimplifiedTrack[]) => {
  const body = {
    tracks,
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
