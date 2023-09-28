import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const body = await request.json();
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are a Spotify AI Assistant tasked with helping users make personalized Spotify playlists when given a genre of music and/or 3 artists that they like.',
      },
      {
        role: 'user',
        content: `Generate me a 10 song playlist consisting of songs from artists: ${body.query}, in an array of JSON objects with the following shape example: {title: 'Goodies', artist: Ciara} `,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  return NextResponse.json({ data: chatCompletion.choices });
}
