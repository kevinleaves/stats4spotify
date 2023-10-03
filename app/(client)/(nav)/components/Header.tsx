import Link from 'next/link';
interface Props {
  children: React.ReactNode;
}
import AuthButton from '../../(auth)/components/AuthButton';

export default function Header({ children }: Props) {
  return (
    <header className="flex border-b-2 gap-4">
      <Link href={'/'}>spotifyGPT</Link>
      {children}
      <AuthButton />
    </header>
  );
}
