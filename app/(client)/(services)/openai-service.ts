const baseURL = '/api/openai';

export const getPlaylist = async (input?: string) => {
  const body = {
    query: input,
  };

  const options: RequestInit = {
    method: 'POST',
    // body: JSON.stringify(body),
  };

  const response = await fetch(baseURL, options);

  const data = await response.json();

  return data.data[0].message.content;
};
