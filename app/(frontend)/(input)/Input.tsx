'use client';
import { useState } from 'react';

export default function Input() {
  const [input, setInput] = useState('');
  return (
    <section>
      <input
        className="rounded-lg text-black w-full h-12"
        value={input}
        placeholder="How are you feeling right now?"
        onChange={(e) => setInput(e.target.value)}
      ></input>
    </section>
  );
}
