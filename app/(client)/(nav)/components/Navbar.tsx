interface Props {
  children: React.ReactNode;
}

export default function Navbar({ children }: Props) {
  return <nav>{children}</nav>;
}
