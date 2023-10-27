'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AuthButton from '../../(auth)/components/AuthButton';

interface Props {
  // children: React.ReactNode;
}
const links = [
  { id: 1, link: '/artists/top', label: 'Top Artists' },
  { id: 2, link: '/tracks/top', label: 'Top Tracks' },
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
    <nav className="flex gap-4 items-center justify-between sm:justify-normal w-full p-4 pr-0">
      <Link href={'/'}>SpotifyGPT</Link>
      <>
        <div className="sm:hidden p-0 mx-0 ">
          <Button onClick={handleClick} variant="outlined" color="success">
            <MenuIcon fontSize="large" />
          </Button>
        </div>
        <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
          <ul className="flex-col sm:gap-4">
            {links.map(({ id, link, label }) => (
              <MenuItem key={id} href={link} component={'a'}>
                {label}
              </MenuItem>
            ))}
          </ul>
          <MenuItem>
            <AuthButton />
          </MenuItem>
        </Menu>
      </>
      <ul className="sm:flex sm:gap-4 hidden">
        {links.map(({ id, link, label }) => (
          <Link className={''} key={id} href={link}>
            {label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
