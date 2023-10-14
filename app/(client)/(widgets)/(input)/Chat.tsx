'use client';
import { useState } from 'react';
import { streamResponse } from '../../(services)/openai-service';
import { getUsersTopItems } from '@/lib/spotify';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../tracks/top/loading';
import LinearProgress from '@mui/material/LinearProgress';

function useUsersTopArtists() {
  // hook used to data fetch users top artists from a client component
  return useQuery({
    queryKey: ['topArtists'],
    queryFn: () => getUsersTopItems('artists', 'short_term', 50),
  });
}

export default function Chat() {
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [results, setResults] = useState('');

  async function handleSubmit(event: React.SyntheticEvent) {
    // clear results on subsquent clicks
    setResults('');
    event.preventDefault();
    // disable the button to prevent users from sending a request while one is currently active
    setIsGeneratingResponse(true);
    const res = await streamResponse();

    // double click does nothing because of our rate limited backend
    if (res.status === 429) {
      setResults('');
      return;
    }

    const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader();

    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader?.read();
      done = doneReading;
      if (value != undefined) {
        setResults((prev) => prev + value);
      }
    }

    // allow user to click the button again
    setIsGeneratingResponse(false);
  }

  return (
    <section className="w-full flex flex-col items-center">
      <div className="whitespace-break-spaces w-full">{results}</div>
      <form onSubmit={handleSubmit}>
        <div className="w-24"></div>
        <button
          type="submit"
          className="justify-center items-center hover:underline hover mt-4 p-4 border-2 rounded-lg w-full"
          disabled={isGeneratingResponse}
        >
          {isGeneratingResponse ? (
            <LinearProgress
              sx={{
                width: '100%',
              }}
            />
          ) : (
            'click here to have spotifyGPT/fantanobot judge your music taste'
          )}
        </button>
      </form>
    </section>
  );
}
