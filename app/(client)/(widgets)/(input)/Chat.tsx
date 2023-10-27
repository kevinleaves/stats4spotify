'use client';
import { useState, useRef } from 'react';
import { streamResponse } from '../../(services)/openai-service';
import LinearProgress from '@mui/material/LinearProgress';

type SimplifiedTrack = {
  name: string;
  artists: string;
  album: string;
};

interface Props {
  simplifiedTracks: SimplifiedTrack[];
}

export default function Chat({ simplifiedTracks }: Props) {
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [results, setResults] = useState(
    "FantanoBot's response will show up here..."
  );

  const chatBoxRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(
    event: React.SyntheticEvent,
    simplifiedTracks: SimplifiedTrack[]
  ) {
    // clear results on subsquent clicks
    setResults('');
    event.preventDefault();
    // disable the button to prevent users from sending a request while one is currently active
    setIsGeneratingResponse(true);
    const res = await streamResponse(simplifiedTracks);

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
        // scroll to the bottom when new content is added
        if (chatBoxRef.current) {
          // type guard to prevent ts error for null ref
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
      }
    }

    // allow user to click the button again
    setIsGeneratingResponse(false);
  }

  return (
    <section className="md:w-5/6 lg:w-1/2 flex flex-col items-center gap-4">
      <div
        className="h-64 lg:h-80 p-4 whitespace-break-spaces w-full overflow-y-scroll rounded-xl bg-zinc-800"
        ref={chatBoxRef}
      >
        <p className="text-sm leading-relaxed">{results}</p>
      </div>
      <form
        className="w-80"
        onSubmit={(e) => handleSubmit(e, simplifiedTracks)}
      >
        <button
          type="submit"
          className="justify-center items-center hover:underline hover mt-2 p-2 md:mt-4 md:p-4 rounded-lg w-full bg-green-900"
          disabled={isGeneratingResponse}
        >
          {isGeneratingResponse ? (
            <LinearProgress
              sx={{
                width: '100%',
              }}
            />
          ) : (
            'Judge your music taste'
          )}
        </button>
      </form>
    </section>
  );
}
