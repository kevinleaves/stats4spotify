'use client';
import { createPlaylist } from '@/lib/spotify';
interface Props {
  headerText: string;
}

export default function ExportPlaylistButton({ headerText }: Props) {
  const exportPlaylist = async (headerText) => {
    const res: SpotifyApi.CreatePlaylistResponse = await createPlaylist(
      headerText
    );
    const { id: playlistId } = res;
  };

  return (
    <button onClick={() => exportPlaylist(headerText)}>create playlist</button>
  );
}
