import { getTracksAudioFeatures, getSeveralTracks } from '@/lib/spotify';

/**
 * extract business logic for data fetching for list components into custom hook
 * @param trackIds: a comma separated string of Spotify Track Ids
 * @returns an array of modified track objects that includes audio features metadata attached to the original track objects
 *
 */
export default async function useGetSeveralTracks(trackIds: string) {
  try {
    const response = await getSeveralTracks(trackIds);

    const { tracks }: { tracks: SpotifyApi.TrackObjectFull[] } = response;

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
