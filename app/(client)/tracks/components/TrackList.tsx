import Image from 'next/image';
import { getTracksAudioFeatures, getUsersTopItems } from '@/lib/spotify';

interface Props {
  tracks: SpotifyApi.TrackObjectFull[];
}

export default async function TrackList({ tracks }: Props) {
  const getArtistString = (artists: SpotifyApi.ArtistObjectSimplified[]) => {
    const artistNames = artists.map((artist) => artist.name);
    return artistNames.join(', ');
  };

  return (
    <ul className="flex flex-col gap-4">
      {tracks.map((track, index) => (
        <li key={track.id} className="flex gap-4">
          <p className="font-bold text-md self-center">{index + 1}</p>
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
  );
}
