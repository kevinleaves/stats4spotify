'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toPng } from 'html-to-image';

interface ShareableSummaryProps {
  tracks?: SpotifyApi.TrackObjectFull[];
  artists?: SpotifyApi.ArtistObjectFull[];
  timeRange?: 'short_term' | 'medium_term' | 'long_term';
}

const timeRangeLabels = {
  short_term: 'last 4 weeks',
  medium_term: 'last 6 months',
  long_term: 'all time',
};

export function ShareableSummary({
  tracks = [],
  artists = [],
  timeRange = 'short_term',
}: ShareableSummaryProps) {
  const summaryRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!summaryRef.current) return;
    await document.fonts.ready;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(summaryRef.current, {
        backgroundColor: '#0f172a',
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = `spotify-stats-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={summaryRef}
        className="w-full max-w-2xl bg-neutral-900 text-white p-8 rounded-xl shadow-2xl relative overflow-hidden"
      >
        {/* decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full -ml-48 -mb-48"></div>

        <div className="relative z-10">
          <div className="grid grid-cols-1 gap-8 mb-8">
            {tracks.length > 0 && (
              <div className="">
                <h3 className="text-xl font-semibold mb-4 text-green-400">
                  Top Tracks: {timeRangeLabels[timeRange]}
                </h3>
                <div className="space-y-3">
                  {tracks
                    .slice(0, 5)
                    .map((track: SpotifyApi.TrackObjectFull, index: number) => (
                      <div
                        key={track.id || index}
                        className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg w-full"
                      >
                        <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden relative">
                          {track.album?.images?.[0]?.url && (
                            <Image
                              src={track.album.images[0].url}
                              alt={track.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                              unoptimized
                            />
                          )}
                        </div>
                        <div className="truncate">
                          <div className="font-medium">{track.name}</div>
                          <div className="text-sm text-slate-400">
                            {track.artists
                              ?.map(
                                (artist: SpotifyApi.ArtistObjectSimplified) =>
                                  artist.name
                              )
                              .join(', ')}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {artists.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-400">
                  Top Artists: {timeRangeLabels[timeRange]}
                </h3>
                <div className="space-y-3">
                  {artists
                    .slice(0, 5)
                    .map(
                      (artist: SpotifyApi.ArtistObjectFull, index: number) => (
                        <div
                          key={artist.id || index}
                          className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg "
                        >
                          <div className="w-10 h-10 bg-slate-700 rounded-full flex-shrink-0 overflow-hidden relative">
                            {artist.images?.[0]?.url && (
                              <Image
                                src={artist.images[0].url}
                                alt={artist.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                                unoptimized
                              />
                            )}
                          </div>
                          <div className="font-medium">{artist.name}</div>
                        </div>
                      )
                    )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-slate-500 text-sm">
            Generated on {new Date().toLocaleDateString()} • stats4spotify.fyi
          </div>
        </div>
      </div>

      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        <Download className="w-4 h-4 mr-2" />
        {isDownloading ? 'Generating...' : 'Download Image'}
      </Button>
    </div>
  );
}
