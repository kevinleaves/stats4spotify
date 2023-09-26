import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: "List out the last 10 NBA MVP's." }],
    model: 'gpt-3.5-turbo',
  });

  return NextResponse.json({
    status: 200,
    data: chatCompletion.choices,
  });
}
