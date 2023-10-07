'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Props {}

const links = [
  { id: 1, param: 'short_term', label: 'last 4 weeks' },
  { id: 2, param: 'medium_term', label: 'last 6 months' },
  { id: 3, param: 'long_term', label: 'all time' },
];

export default function TrackLinks({}: Props) {
  const params = useSearchParams();
  const activeLink = params.get('timeRange') ?? 'short_term';
  return (
    <ul className="flex gap-4">
      {links.map(({ id, param, label }) => (
        <li key={id}>
          <Link
            className={`${
              activeLink === param ? 'font-bold' : 'font-extralight'
            }`}
            href={`/tracks/top/?timeRange=${param}`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
