'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getUsersTopItems } from '@/lib/spotify';
import Loading from './loading';
import ArtistList from '../_components/ArtistList';
import { Typography, Select, InputLabel, MenuItem } from '@mui/material';
import ArtistDetailsModal from '../_components/ArtistDetailsModal';
import filterTracksByArtist from '@/lib/utils/filterTracksByArtist';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ShareableSummary } from '@/app/_components/summary/ShareableSummary';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { OpenInNewWindowIcon } from '@radix-ui/react-icons';

interface Props {}

export default function ClientArtistPage({}: Props) {
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
  const [currentTab, setCurrentTab] = useState('top');
  const [isGridExpanded, setIsGridExpanded] = useState(true);

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

  let { items: artists } = data;

  let top = artists.slice();
  // sort method mutates original array, so we copy it
  let sorted = artists?.slice().sort((a, b) => {
    return b.popularity - a.popularity;
  });

  artists = currentTab === 'top' ? top : sorted;

  const onRepeat = filterTracksByArtist(
    selectedArtist?.id,
    tracksResponse.data.items
  );

  return (
    <main className="flex flex-col justify-center items-center gap-4 sm:max-lg:gap-8">
      <div className="flex flex-col items-center gap-4 w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">
              Share &nbsp; <OpenInNewWindowIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
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
              </DialogTitle>
              <DialogDescription>Your favorite artists.</DialogDescription>
            </DialogHeader>
            <ShareableSummary artists={artists} timeRange={timeRange} />
          </DialogContent>
        </Dialog>
      </div>
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

      <InputLabel sx={{ color: 'black' }} id="artists-sorted-by">
        Arists sorted by:
        <Select
          labelId="artists-sorted-by"
          value={currentTab}
          onChange={(e) => setCurrentTab(e.target.value)}
          sx={{ bgcolor: 'white', width: '8em', height: '2em', ml: '4px' }}
        >
          <MenuItem value="top">rank</MenuItem>
          <MenuItem value="popularity">popularity</MenuItem>
        </Select>
      </InputLabel>

      <div className="hidden md:flex md:gap-2">
        <Checkbox
          id="artist-grid-toggle"
          onCheckedChange={() => {
            setIsGridExpanded(!isGridExpanded);
          }}
          defaultChecked={isGridExpanded}
        ></Checkbox>
        <Label htmlFor="artist-grid-toggle">Expand Grid View</Label>
      </div>
      <ArtistList
        artists={artists}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        setSelectedArtist={setSelectedArtist}
        variant={isGridExpanded ? 'expanded' : 'condensed'}
      />

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
