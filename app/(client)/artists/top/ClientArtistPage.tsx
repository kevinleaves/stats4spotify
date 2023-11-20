'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getUsersTopItems } from '@/lib/spotify';
import Loading from './loading';
import ArtistList from '../_components/ArtistList';
import { Typography } from '@mui/material';
import ArtistDetailsModal from '../../cartists/_components/ArtistDetailsModal';
import filterTracksByArtist from '@/lib/utils/filterTracksByArtist';

interface Props {}

export function ClientArtistPage({}: Props) {
  const searchParams = useSearchParams();
  const timeRange = searchParams.get('timeRange') ?? 'short_term';

  let headerText = 'Top Artists: last 4 weeks';

  switch (timeRange) {
    case 'short_term':
      headerText = 'Top Artists: last 4 weeks';
      break;
    case 'medium_term':
      headerText = 'Top Artists: last 6 months';
      break;
    case 'long_term':
      headerText = 'Top Artists: all time';
      break;
    default:
      break;
  }

  function useUsersTopArtists() {
    // hook used to data fetch users top artists from a client component
    return useQuery({
      queryKey: ['artists', timeRange],
      queryFn: () => {
        return getUsersTopItems('artists', timeRange, 50);
      },
    });
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] =
    useState<SpotifyApi.ArtistObjectFull | null>(null);

  const { data, isError, error, isFetching } = useUsersTopArtists();

  const tracksResponse = useQuery({
    queryKey: [`Tracks: ${timeRange}`],
    queryFn: () => getUsersTopItems('tracks', timeRange, 50),
  });

  if (isFetching || tracksResponse.isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const { items: artists } = data;

  // sort method mutates original array, so we copy it
  let sorted = artists?.slice().sort((a, b) => {
    return b.popularity - a.popularity;
  });

  const onRepeat = filterTracksByArtist(
    selectedArtist?.id,
    tracksResponse.data.items
  );

  return (
    <main className="flex flex-col justify-center items-center gap-4 sm:max-lg:gap-8">
      <Typography
        variant="h2"
        sx={{
          '@media (min-width: 1024px)': {
            fontSize: '1.875rem',
            lineHeight: '2.25rem',
          },
          fontSize: '1.125rem',
          lineHeight: '1.75rem',
          fontWeight: 700,
          letterSpacing: '-0.05em',
        }}
      >
        {headerText}
      </Typography>
      {artists?.length === 0 ? (
        <div className="flex flex-col items-center w-full sm:w-1/2">
          {`It seems that you haven't heard enough music to calculate any
          favorites from it. Try another time range or listen to some more music
          and try again later!`}
        </div>
      ) : (
        <ArtistList
          artists={artists}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          setSelectedArtist={setSelectedArtist}
        />
      )}
      {isModalOpen ? (
        <ArtistDetailsModal
          selectedArtist={selectedArtist}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          setSelectedArtist={setSelectedArtist}
          onRepeat={onRepeat}
          timeRange={timeRange}
        />
      ) : null}
    </main>
  );
}
