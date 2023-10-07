import { getTracksAudioFeatures, getUsersTopItems } from '@/lib/spotify';
import { Suspense } from 'react';
import Loading from './loading';
import TrackList from '../components/TrackList';
import ExportPlaylistButton from '../components/ExportPlaylistButton';

interface Props {
  params: { slug: string };
  searchParams: { timeRange: 'short_term' | 'medium_term' | 'long_term' };
}

export default async function TracksPage({ searchParams }: Props) {
  const { timeRange } = searchParams;

  let headerText = 'Top Tracks: last 4 weeks';

  switch (timeRange) {
    case 'short_term':
      headerText = 'Top Tracks: last 4 weeks';
      break;
    case 'medium_term':
      headerText = 'Top Tracks: last 6 months';
      break;
    case 'long_term':
      headerText = 'Top Tracks: all time';
      break;
    default:
      break;
  }

  const response = await getUsersTopItems('tracks', timeRange, 50);

  if (!response) {
    return;
  }

  const { items: tracks }: { items: SpotifyApi.TrackObjectFull[] } = response;

  const getTrackIds = (tracks: SpotifyApi.TrackObjectFull[]) => {
    return tracks.map((tracks) => tracks.id).join(',');
  };

  const trackUris = tracks.map((track) => track.uri);

  const { audio_features: features } = await getTracksAudioFeatures(
    getTrackIds(tracks)
  );

  const addMetadataToTracks = (
    tracks: SpotifyApi.TrackObjectFull[],
    features: SpotifyApi.AudioFeaturesObject[]
  ) => {
    for (let i = 0; i < tracks.length; i++) {
      Object.assign(tracks[i], features[i]);
    }
  };

  addMetadataToTracks(tracks, features);

  return (
    <main className="flex flex-col justify-center items-center gap-20">
      <h2 className="text-3xl">{headerText}</h2>

      <Suspense key={searchParams.timeRange} fallback={<Loading />}>
        <ExportPlaylistButton headerText={headerText} uris={trackUris} />
        <TrackList tracks={tracks} />
      </Suspense>
    </main>
  );
}
