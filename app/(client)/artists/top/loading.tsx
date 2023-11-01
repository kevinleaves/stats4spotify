interface Props {}
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading({}: Props) {
  return (
    <main className="text-center">
      <CircularProgress color="secondary" size={60} thickness={5} />
      <h2 className="text-sm text-slate-950 dark:text-white font-extralight">
        Loading your favorite artists...
      </h2>
      <h2 className="text-sm text-slate-950 dark:text-white font-extralight">
        Hopefully not for too long : )
      </h2>
    </main>
  );
}
