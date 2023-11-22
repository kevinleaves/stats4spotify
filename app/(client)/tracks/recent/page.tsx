'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  tableCellClasses,
} from '@mui/material';
import { getRecentlyPlayed } from '@/lib/spotify';

interface Props {}

export default function RecentTracksPage({}: Props) {
  const response = useQuery({
    queryKey: ['recent'],
    queryFn: () => {
      return getRecentlyPlayed(50);
    },
  });

  if (response.isFetching) {
    return <>loading...</>;
  }

  if (response.isError) {
    return <div>{response.error.message}</div>;
  }

  const getArtistString = (artists: SpotifyApi.ArtistObjectSimplified[]) => {
    const artistNames = artists.map((artist) => artist.name);
    return artistNames.join(', ');
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ display: 'flex', flexDirection: 'column' }}
      className="rounded-lg justify-center mt-4 px-2 md:px-4"
    >
      <Table
        aria-label="recently played tracks table"
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell className="text-lg p-2 py-0" sx={{ fontWeight: 700 }}>
              Track
            </TableCell>
            <TableCell className="text-lg p-2 py-0" sx={{ fontWeight: 700 }}>
              Artist(s)
            </TableCell>
            <TableCell className="text-lg p-2 py-0" sx={{ fontWeight: 700 }}>
              Played At
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response.data?.items.map((track) => (
            <TableRow
              key={track.track.id}
              component={Link}
              href={track.track.external_urls.spotify}
              target="_blank"
              hover
            >
              <TableCell padding="none">{track.track.name}</TableCell>
              <TableCell padding="none">
                {getArtistString(track.track.artists)}
              </TableCell>
              <TableCell padding="none">
                {new Date(track.played_at).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
