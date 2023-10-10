'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Link {
  id: number;
  param: 'short_term' | 'medium_term' | 'long_term';
  label: 'last 4 weeks' | 'last 6 months' | 'all time';
}

interface Props {
  links: Link[];
  baseUrl: string;
}

export default function LinkList({ links, baseUrl }: Props) {
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
            href={`${baseUrl}${param}`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
