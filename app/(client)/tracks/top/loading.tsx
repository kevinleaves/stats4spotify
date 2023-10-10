interface Props {}
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading({}: Props) {
  return (
    <main className="text-center">
      <CircularProgress color="secondary" size={60} thickness={5} />
      <h2 className="text-sm text-white font-extralight">
        Loading your favorite tracks...
      </h2>
      <h2 className="text-sm text-white font-extralight">
        Hopefully not for too long : )
      </h2>
    </main>
  );
}
