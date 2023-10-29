'use client';
import { useState } from 'react';
import { createPlaylist, addItemsToPlaylist } from '@/lib/spotify';
import LinearProgress from '@mui/material/LinearProgress';
import Link from 'next/link';

interface Props {
  headerText: string;
  uris: string[] | undefined;
}

export default function ExportPlaylistButton({ headerText, uris }: Props) {
  const [isPlaylistGenerated, setIsPlaylistGenerated] = useState(false);
  const [playlistId, setPlaylistId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const baseURL = 'https://open.spotify.com/playlist';

  const exportPlaylist = async (headerText: string, uris: string[] = []) => {
    setIsLoading(true);
    const res: SpotifyApi.CreatePlaylistResponse = await createPlaylist(
      headerText
    );

    const { id } = res;
    setPlaylistId(id);
    await addItemsToPlaylist(id, uris);
    setIsLoading(false);
    setIsPlaylistGenerated(true);
  };

  return (
    <div className="flex justify-center h-12 w-80 items-center">
      {isLoading ? (
        <LinearProgress
          sx={{
            width: '100%',
          }}
        />
      ) : isPlaylistGenerated ? (
        <Link
          href={`${baseURL}/${playlistId}`}
          className={
            'bg-blue-400 rounded-lg hover:underline p-2 w-full text-center'
          }
          target="_blank"
        >
          View playlist
        </Link>
      ) : (
        <button
          className={
            'bg-green-600 rounded-lg hover:underline p-2 w-full text-center'
          }
          onClick={() => exportPlaylist(headerText, uris)}
        >
          Create playlist
        </button>
      )}
    </div>
  );
}
