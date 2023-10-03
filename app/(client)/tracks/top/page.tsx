import { getTracksAudioFeatures, getUsersTopItems } from '@/lib/spotify';
import Image from 'next/image';

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
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

  const getArtistString = (artists: SpotifyApi.ArtistObjectSimplified[]) => {
    const artistNames = artists.map((artist) => artist.name);
    return artistNames.join(', ');
  };

  const getTrackIds = (tracks: SpotifyApi.TrackObjectFull[]) => {
    return tracks.map((tracks) => tracks.id).join(',');
  };

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
      <ul className="flex flex-col gap-4">
        {tracks.map((track) => (
          <li key={track.id} className="flex gap-4">
            <Image
              src={track.album.images[1].url}
              alt="a track image"
              width={50}
              height={50}
              className="rounded-xl w-24"
            />
            <div className="flex justify-between w-full">
              <div className="flex-col mr-">
                <p className="text-xl font-semibold">{track.name}</p>
                <p className="font-extralight">
                  {getArtistString(track.artists)}
                </p>
                <p className="font-extralight">
                  BPM/Tempo: {Math.round(track.tempo)}
                </p>
              </div>
              <a href={track.uri}>track link</a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
