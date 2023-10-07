import Link from 'next/link';
interface Props {
  children: React.ReactNode;
}
import AuthButton from '../../(auth)/components/AuthButton';

export default function Header({ children }: Props) {
  return (
    <header className="flex border-b-2 ">
      <section className="flex gap-4 px-40 pb-8 pt-4">
        <Link href={'/'}>spotifyGPT</Link>
        {children}
        <AuthButton />
      </section>
    </header>
  );
}
