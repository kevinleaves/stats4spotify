'use client';
import { useState } from 'react';
import { getPlaylist } from '../../(services)/openai-service';

import { getUsersTopItems } from '@/lib/spotify';
import { useQuery } from '@tanstack/react-query';

function useUsersTopArtists() {
  // hook used to data fetch users top artists from a client component
  return useQuery({
    queryKey: ['topArtists'],
    queryFn: () => getUsersTopItems('artists', 'short_term', 50),
  });
}

export default function Input() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState('');

  const { status, data, error, isFetching } = useUsersTopArtists();

  if (!isFetching) {
    console.log(data, 'data');
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    const res = await getPlaylist(input);
    setResults(res);
    setIsLoading(false);
    setInput('');
  }

  return (
    <section>
      {isLoading ? <div>loading </div> : <div>not loading</div>}
      <div>{results}</div>
      <form onSubmit={onSubmit}>
        <input
          className="rounded-lg text-black w-full h-12"
          value={input}
          placeholder="How are you feeling right now?"
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button className="border-2 rounded-lg">submit here</button>
      </form>
    </section>
  );
}
