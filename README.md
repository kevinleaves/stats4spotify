# Project Objective

- combined OpenAI Chat Completions API w/ Spotify /users/top endpoint to analyze user's music taste from the perspective of a music reviewer

## project takeaways

### Best Practices

- extracting repetitive business logic inside of custom hooks (useUserTop.tsx)
- API keys should not be exposed in client side calls, hitting external APIs should happen from server-side

### Auth

- implemented Spotify OAuth 2.0 flow using Auth.js + JWT (auth.ts)
- customize Auth.js callbacks to add necessary OAuth data into JWT & session objects (auth.ts)

### Next.js 13

- next.js app router architecture
- fetching data client-side vs server-side (react query vs fetch API in server components)
- grabbing URL searchParams within server pages props (/tracks/top/page.tsx)
- differences in client-side vs server-side
- authentication in client-side vs server-side
- Next 13 exclusive:
  - when to use client components (interactive components) as opposed to server components

### Frontend

- wrap components/pages in React Suspense + fallback to handle loading state for better UX (/tracks/top/page.tsx)

### Backend

- streaming chatgpt response via ReadableStream instead of waiting for the entire response to complete for better UX (/api/openai/route.ts)
