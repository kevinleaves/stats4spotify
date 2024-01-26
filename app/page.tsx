import Chat from './(client)/(widgets)/(input)/Chat';
import TrackList from './(client)/tracks/_components/TrackList';
import { demoTrackData } from './(data)/demoTrackData';
import { demoSongData } from './(data)/demoSongData.js';
import Contact from './(client)/(contact)/_components/Contact';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between gap-4 ">
      <div className="flex flex-col items-center gap-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          SpotifyGPT - Music Taste Analyzer
        </h1>
        <article className="bg-green-600 rounded-lg p-4 text-sm w-full sm:w-1/2 text-zinc-200">
          Discover and analyze your music preferences like never before. This
          app combines the magic of AI and your Spotify library to provide you
          with personalized music taste reviews. Create playlists from your top
          tracks.
        </article>
        <h2 className="scroll-m-20 text-3xl font-semibold text-black tracking-tight bg-secondary dark:text-white dark:bg-zinc-800 rounded-lg p-2">
          Check out the demo below! No login required.
        </h2>
        <Chat
          simplifiedTracks={demoSongData}
          demo={true}
          placeholder={`SpotifyGPT's response will show up here.. This sample response is using dummy data, not your own!`}
        />
        <p className="w-full sm:w-1/2 text-sm leading-6 [&:not(:first-child)]:mt-6">
          NOTE: This app is currently in developer mode, which means that you
          will not be able to access your Spotify User Data unless you are added
          to the whitelist. You can request to be added in the form below!
        </p>
        <h2 className="scroll-m-20 text-3xl font-bold tracking-tighter lg:text-4xl">
          Top Tracks: last 4 weeks (sample)
        </h2>
        <TrackList tracks={demoTrackData} />
        <h2 className="font-bold tracking-tight text-3xl lg:text-4xl">
          Contact me to request to be added to the whitelist!
        </h2>
        <Contact />
        <div className="flex flex-col gap-4 font-light tracking-tight">
          <h3 className="font-semibold text-lg">Key Features:</h3>
          <ul>
            <li>Music Taste Analysis</li>
            <li>OpenAI Chat Integration</li>
            <li>User Authentication</li>
            <li>Intuitive User Interface</li>
          </ul>
          <p>Explore the world of music with today!</p>
        </div>
      </div>
    </main>
  );
}
