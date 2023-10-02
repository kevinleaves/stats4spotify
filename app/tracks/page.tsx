import { getTracksAudioFeatures, getUsersTopItems } from '@/lib/spotify';
import Image from 'next/image';

interface Props {}

export default async function TracksPage({}: Props) {
  const response = await getUsersTopItems('tracks', 'short_term', 50);

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
    <>
      {tracks.map((track) => (
        <li key={track.id}>
          <p>{track.name}</p>
          <p>{track.href}</p>
          <p>{getArtistString(track.artists)}</p>
          <p>{Math.round(track.tempo)}</p>
          <Image
            src={track.album.images[2].url}
            alt="a track image"
            width={50}
            height={50}
          />
        </li>
      ))}
    </>
  );
}
