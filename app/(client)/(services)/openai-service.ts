const baseURL = '/api/openai';

export const streamResponse = async (input?: string) => {
  const body = {
    query: input,
  };

  const options: RequestInit = {
    method: 'POST',
    headers: {},
  };

  return fetch(baseURL, options);
};
