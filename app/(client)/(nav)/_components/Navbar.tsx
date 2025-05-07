'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AuthButton from '../../(auth)/_components/AuthButton';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';

interface Props {}
const links = [
  { id: 1, link: '/artists/top', label: 'Top Artists' },
  { id: 2, link: '/tracks/top', label: 'Top Tracks' },
  { id: 3, link: '/tracks/recent', label: 'Recently played' },
];

export default function Navbar({}: Props) {
  // anchorEl sets position of the dropdown menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="flex gap-4 items-center justify-between sm:justify-normal w-full py-4 pr-0">
      <Button asChild variant={'outline'}>
        <Link href={'/'}>
          <FontAwesomeIcon className={'h-4 pr-4'} icon={fab.faSpotify} />
          Stats4Spotify
        </Link>
      </Button>
      <>
        <div className="sm:hidden p-0 mx-0 ">
          <Button onClick={handleClick} variant="ghost" color="primary">
            <MenuIcon fontSize="large" color={'primary'} />
          </Button>
        </div>
        <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
          <ul className="flex flex-col items-center sm:gap-4">
            {links.map(({ id, link, label }) => (
              <Button asChild key={id} variant={'ghost'} className="w-full">
                <MenuItem href={link} component={'a'}>
                  {label}
                </MenuItem>
              </Button>
            ))}
          </ul>
          <MenuItem>
            <AuthButton />
          </MenuItem>
        </Menu>
      </>
      <ul className="sm:flex hidden">
        {links.map(({ id, link, label }) => (
          <Button asChild variant={'link'} key={id}>
            <Link className={''} href={link}>
              {label}
            </Link>
          </Button>
        ))}
      </ul>
    </nav>
  );
}
