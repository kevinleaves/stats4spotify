import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import OpenAI from 'openai';
import { songData } from '../../(data)/songData.js';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(request: Request) {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const ip = request.headers.get('x-forwarded-for');
    const ratelimit = new Ratelimit({
      redis: kv,
      // rate limit to 1 request per 10 seconds
      limiter: Ratelimit.slidingWindow(1, '10s'),
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_${ip}`
    );

    if (!success) {
      return new Response('Too many requests.', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }
  } else {
    console.log(
      'KV_REST_API_URL and KV_REST_API_TOKEN env vars not found, not rate limiting...'
    );
  }

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `ChatGPT, please act as Anthony Fantano, a popular music reviewer, for the rest of this discussion and answer the following question in a manner consistent with his reviewing style.

        ChatGPT: [Response as Anthony Fantano]`,
      },
      {
        role: 'user',
        content: `acting as anthony fantano, a popular music reviewer, use this list of my top tracks: ${JSON.stringify(
          songData
        )} to judge my music taste and make inferences on it. write 4 paragraphs critiquing my music taste. Start every response with the phrase: "Hi everyone. Anthony Fantano here, the internet's busiest music nerd, and it's time for a review of Kevin's Le's music taste. at the end, give my music taste a range score from 0 - 10 with the difference in range being no greater than 1. any number can be prefixed with the adjectives "light", "decent", or "strong", where a "light 3" would indicate approximately 3.2, and a "strong 3" would be approximately 3.8. write the ending score in the format: "i'm feeling a light 3 to a strong 4 on this one". use numerous examples of songs in this array to personalize the message. act in a playful but critical tone.
        `,
      },
    ],
    model: 'gpt-3.5-turbo',
    stream: true,
  });

  // Convert the OpenAI response into a ReadableStream
  const stream = OpenAIStream(response);

  // Respond with the stream
  const textResponse = new StreamingTextResponse(stream);

  return textResponse;
}
