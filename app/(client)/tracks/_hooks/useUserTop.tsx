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
  //* 2 paths according to type
  if (type === 'tracks') {
    try {
      const response = await getUsersTopItems(type, timeRange, 50);
      //* happy path
      const { items: tracks }: { items: SpotifyApi.TrackObjectFull[] } =
        response;

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
      //! unhappy path: getUsersTopItems returns empty because user doesn't have enough listening history to populate API call
      console.error(err);
      return { tracks: [], trackUris: [] };
    }
  } else if (type === 'artists') {
    try {
      const response = await getUsersTopItems(type, timeRange, 50);
      const { items: artists }: { items: SpotifyApi.ArtistObjectFull[] } =
        response;
      return {
        artists,
      };
    } catch (err) {
      //! unhappy path: getUsersTopItems returns empty because user doesn't have enough listening history to populate API call
      console.error(err);
      return { artists: [] };
    }
  }
}
