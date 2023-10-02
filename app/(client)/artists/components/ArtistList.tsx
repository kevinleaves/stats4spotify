// VIEW COMPONENT

import List from '@mui/material/List';
import ArtistCard from './ArtistCard';

interface Props {
  artists: SpotifyApi.ArtistObjectFull[];
}

export default function ArtistList({ artists }: Props) {
  return (
    <List sx={{ display: 'flex', flexDirection: 'column' }}>
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </List>
  );
}
