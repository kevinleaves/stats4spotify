import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { useQuery } from '@tanstack/react-query';
import { getArtistRelatedArtists } from '@/lib/spotify';
import ArtistCard from '../../artists/_components/ArtistCard';

ArtistCard;
const style = {
  // position: 'absolute' as 'absolute',
  // top: '100%',
  // left: '100%',
  // transform: 'translate(-50%, -50%)',
  width: '100%',
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  p: 4,
};

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedArtist: SpotifyApi.ArtistObjectFull | null;
  setSelectedArtist: React.Dispatch<
    React.SetStateAction<SpotifyApi.ArtistObjectFull | null>
  >;
}

export default function ArtistDetailsModal({
  isModalOpen,
  setIsModalOpen,
  selectedArtist,
  setSelectedArtist,
}: Props) {
  const { data, isError, error, isFetching, refetch } = useQuery({
    queryKey: [selectedArtist?.name],
    queryFn: () => getArtistRelatedArtists(selectedArtist?.id),
    enabled: isModalOpen,
  });

  return (
    <Dialog
      className="w-full h-full"
      open={isModalOpen}
      onClose={(event, reason) => {
        setIsModalOpen(false);
        setSelectedArtist?.(null);
      }}
      maxWidth="xl"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {selectedArtist.name}
        </Typography>
        <p className="font-thin min-h-32 text-center">
          {selectedArtist.genres.slice(0, 4).join(', ')}
        </p>
        <Typography>Related Artists:</Typography>
        <div className="flex">
          {data?.artists.slice(0, 5).map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
              setSelectedArtist={setSelectedArtist}
            />
          ))}
        </div>
      </Box>
    </Dialog>
  );
}
