import Chat from './(client)/(widgets)/(input)/Chat';
import TrackList from './(client)/tracks/_components/TrackList';
import { demoTrackData } from './(data)/demoTrackData';
import { demoSongData } from './(data)/demoSongData.js';
import Contact from './(client)/(contact)/_components/Contact';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between gap-4 ">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-3xl pt-4">
          SpotifyGPT - Music Taste Analyzer
        </h1>
        <p className="bg-green-600 rounded-lg p-4 text-sm">
          Discover and analyze your music preferences like never before. This
          app combines the magic of AI and your Spotify library to provide you
          with personalized music taste reviews.
        </p>
        <h2 className="font-semibold text-2xl">
          Check out the demo below! No login required.
        </h2>
        <Chat simplifiedTracks={demoSongData} demo={true} />
        <h2 className="text-lg font-bold tracking-tighter lg:text-3xl">
          Top Tracks: last 4 weeks (sample)
        </h2>
        <TrackList tracks={demoTrackData} />
        <h3 className="font-bold tracking-tight text-2xl">
          Contact me to request to be added to the whitelist!
        </h3>
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
