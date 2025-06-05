import TrackList from './(client)/tracks/_components/TrackList';
import { demoTrackData } from './(data)/demoTrackData';
import Contact from './(client)/(contact)/_components/Contact';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BarChart3, Sparkles, ImageIcon } from 'lucide-react';

export default async function Home() {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-green-400 mb-4" />,
      title: 'In-Depth Stats',
      description: 'Discover your top artists & tracks.',
    },
    {
      icon: <Sparkles className="h-8 w-8 text-green-400 mb-4" />,
      title: 'Create Playlists',
      description:
        'Create playlists from your charts to match your listening patterns and preferences.',
    },
    {
      icon: <ImageIcon className="h-8 w-8 text-green-400 mb-4" />,
      title: 'Share Your Music Taste',
      description:
        'Generate summaries of your music taste to share with friends.',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-neutral-900  text-white py-20 ">
        <div className="container mx-auto px-4 text-center tracking-tighter">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-medium mb-6 bg-clip-text text-transparent bg-white ">
              Get Your Spotify Wrapped, anytime.
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              What do you want to see?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="default"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-normal group shadow-lg shadow-green-900/30 hover:shadow-green-900/50 transition-all duration-300"
              >
                <Link href="/artists/top">Top Artists</Link>
              </Button>
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-normal group shadow-lg shadow-green-900/30 hover:shadow-green-900/50 transition-all duration-300"
              >
                <Link href="/tracks/top">Top Tracks</Link>
              </Button>
              <Button
                asChild
                variant="default"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-normal group shadow-lg shadow-green-900/30 hover:shadow-green-900/50 transition-all duration-300"
              >
                <Link href="/tracks/recent">Recently Played</Link>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm"
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Tracks Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-center mb-8">
              Top Tracks: Last 4 Weeks
              <span className="block text-base font-normal text-slate-500 mt-2">
                Sample Data - Connect your account to see your stats
                <br />
                <span className="text-sm text-slate-400">
                  Note: This app is currently in developer mode. You&apos;ll
                  need to be added to the whitelist to access your Spotify data.
                </span>
              </span>
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8">
              <TrackList
                tracks={demoTrackData}
                trackViewVariant="default"
                variant="default"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Ready to explore your music journey?
            </h2>
            <p className="text-slate-600 mb-8">
              Request access to get started.
            </p>
            <Contact />
          </div>
        </div>
      </section>
    </main>
  );
}
