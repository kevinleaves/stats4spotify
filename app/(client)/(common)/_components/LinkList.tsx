'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

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
          <Button variant={'outline'}>
            <Link
              className={`${
                activeLink === param
                  ? 'font-bold text-green-600 dark:text-green-400 tracking-tighter'
                  : 'font-extralight tracking-tighter'
              }`}
              href={`${baseUrl}${param}`}
            >
              {label}
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
