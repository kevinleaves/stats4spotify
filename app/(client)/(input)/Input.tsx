'use client';
import { useState } from 'react';
import { getPlaylist } from '../(services)/openai-service';

export default function Input() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState('');

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const res = await getPlaylist(input);
    setResults(res);
  }

  return (
    <section>
      <div>{results}</div>
      <div>yerr</div>
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
