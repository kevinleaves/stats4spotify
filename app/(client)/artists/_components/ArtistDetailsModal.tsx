import {
  List,
  ListItem,
  Divider,
  Box,
  Typography,
  Dialog,
} from '@mui/material';
import TrackView from '../../tracks/_components/TrackView';

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
  gap: '1em',
};

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedArtist: SpotifyApi.ArtistObjectFull | null;
  setSelectedArtist: React.Dispatch<
    React.SetStateAction<SpotifyApi.ArtistObjectFull | null>
  >;
  onRepeat: SpotifyApi.TrackObjectFull[];
  timeRange: string;
}

export default function ArtistDetailsModal({
  isModalOpen,
  setIsModalOpen,
  selectedArtist,
  setSelectedArtist,
  onRepeat,
  timeRange,
}: Props) {
  let timeRangeText = 'last 4 weeks';

  switch (timeRange) {
    case 'short_term':
      timeRangeText = 'last 4 weeks';
      break;
    case 'medium_term':
      timeRangeText = 'last 6 months';
      break;
    case 'long_term':
      timeRangeText = 'all time';
      break;
    default:
      break;
  }

  // console.log(timeRange, 'timeRange');
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
        <Divider component="div" role="presentation" />
        <Typography className="font-thin min-h-32">{`Your favorite tracks by this artist: ${timeRangeText}`}</Typography>
        <List
          disablePadding
          sx={{
            overflowY: 'auto',
            height: '24rem',
          }}
          className="border border-solid rounded-lg bg-slate-50 p-2"
        >
          {onRepeat.map((track, idx) => (
            <ListItem key={track.id} sx={{ gap: 1 }} disableGutters>
              <TrackView index={idx} track={track} variant="compact" />
            </ListItem>
          ))}
        </List>
        <Box className="font-thin min-h-32">
          <Typography variant="h6">Genres:</Typography>
          <Typography className="font-thin">
            {selectedArtist.genres.slice(0, 4).join(', ')}
          </Typography>
        </Box>
        <Divider component="div" role="presentation" sx={{ padding: '.5em' }} />
      </Box>
    </Dialog>
  );
}
