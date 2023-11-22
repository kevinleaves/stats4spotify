/**
 *
 * @param artists an array of Spotify Artist Objects
 * @returns a comma separated string of the artists' names
 */
export default function getArtistString(
  artists: SpotifyApi.ArtistObjectSimplified[]
) {
  const artistNames = artists.map((artist) => artist.name);
  return artistNames.join(', ');
}
