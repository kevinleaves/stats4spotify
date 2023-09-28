'use client';
import { useState } from 'react';
import { getPlaylist } from '../../(services)/openai-service';

export default function Input() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState('');

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    const res = await getPlaylist(input);
    setResults(res);
    setIsLoading(false);
    setInput('');
  }

  const login = async () => {
    const res = await fetch('/api/spotify/login');
    const data = await res.json();
    console.log(data, 'data');
  };

  return (
    <section>
      {isLoading ? <div>loading </div> : <div>not loading</div>}
      <div>{results}</div>
      <button onClick={login}>log into spotify</button>
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
