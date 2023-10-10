import { getTracksAudioFeatures, getUsersTopItems } from '@/lib/spotify';

interface Props {
  timeRange: 'short_term' | 'medium_term' | 'long_term';
  type: 'tracks' | 'artists';
}

/**
 * extract business logic for data fetching for list components into custom hook
 * @param timeRange: 'short_term' | 'medium_term' | 'long_term'"
 * @param type: 'tracks' | 'artists';
 * @returns
 *
 */
export default async function useUserTop(
  timeRange: 'short_term' | 'medium_term' | 'long_term',
  type: 'tracks' | 'artists'
) {
  try {
    const response = await getUsersTopItems(type, timeRange, 50);

    if (type === 'artists') {
      const { items: artists }: { items: SpotifyApi.ArtistObjectFull[] } =
        response;
      return {
        artists,
      };
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
    return {
      tracks,
      trackUris,
    };
  } catch (err) {
    console.error(err);
    Promise.reject(err);
    return { tracks: [], trackUris: [] };
  }
}
