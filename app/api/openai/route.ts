import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      // {
      //   role: 'system',
      //   content:
      //     'You are a Spotify AI Assistant tasked with helping users make personalized Spotify playlists when given a genre of music and/or 3 artists that they like.',
      // },
      { role: 'user', content: 'Generate me a 10 song playlist.' },
    ],
    model: 'gpt-3.5-turbo',
  });
  // .catch((err) => {
  //   if (err instanceof OpenAI.APIError) {
  //     console.log(err.status);
  //     console.log(err.name);
  //     console.log(err.headers);
  //   } else {
  //     throw err;
  //   }
  // });

  return NextResponse.json({ data: chatCompletion.choices });
}
