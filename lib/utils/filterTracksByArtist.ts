export default function filterTracksByArtist(
  artistId: SpotifyApi.ArtistObjectFull['id'],
  tracks: SpotifyApi.TrackObjectFull[]
) {
  return tracks.filter((track) => {
    // only account for 1 artist at the moment.
    return (
      track.artists.filter((artist) => {
        return artist.id === artistId;
      }).length > 0
    );
  });
}
