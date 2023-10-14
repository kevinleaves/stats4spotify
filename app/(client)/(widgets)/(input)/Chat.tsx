'use client';
import { useState } from 'react';
import { streamResponse } from '../../(services)/openai-service';
import { getUsersTopItems } from '@/lib/spotify';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../tracks/top/loading';

function useUsersTopArtists() {
  // hook used to data fetch users top artists from a client component
  return useQuery({
    queryKey: ['topArtists'],
    queryFn: () => getUsersTopItems('artists', 'short_term', 50),
  });
}

export default function Chat() {
  // const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState('');

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    // setIsLoading(true);
    const res = await streamResponse();
    const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader();

    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader?.read();
      done = doneReading;
      if (value != undefined) {
        setResults((prev) => prev + value);
      }
    }
  }

  return (
    <section className="w-full flex flex-col items-center">
      {/* {isLoading ? <Loading /> : <div>not loading</div>} */}

      <div className="whitespace-break-spaces w-full">{results}</div>
      <form onSubmit={onSubmit}>
        <button
          type="submit"
          className="justify-center items-center hover:underline hover mt-4 p-4 border-2 rounded-lg"
        >
          click here to have spotifyGPT/fantanobot judge your music taste
        </button>
      </form>
    </section>
  );
}
