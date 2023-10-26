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
    <div className="flex justify-center h-12 w-48 items-center">
      {isLoading ? (
        <LinearProgress
          sx={{
            width: '100%',
          }}
        />
      ) : isPlaylistGenerated ? (
        <Link
          href={`${baseURL}/${playlistId}`}
          className={'bg-blue-200  rounded-lg hover:underline p-4'}
          target="_blank"
        >
          view playlist
        </Link>
      ) : (
        <button
          className={'bg-green-600  rounded-lg hover:underline p-4'}
          onClick={() => exportPlaylist(headerText, uris)}
        >
          create playlist
        </button>
      )}
    </div>
  );
}
