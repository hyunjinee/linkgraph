'use client';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

import { Song } from '@/types';
import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';
import usePlayer from '@/hooks/usePlayer';
import { twMerge } from 'tailwind-merge';

type SidebarProps = {
  children: React.ReactNode;
  songs: Song[];
};

const Sidebar = ({ children, songs }: SidebarProps) => {
  const player = usePlayer();
  const pathname = usePathname();
  const routes = [
    {
      icon: HiHome,
      label: 'Home',
      active: pathname !== '/search',
      href: '/',
    },
    {
      icon: BiSearch,
      label: 'Search',
      active: pathname === '/search',
      href: '/search',
    },
  ];
  return (
    <div className={twMerge(`flex h-full `, player.activeId && 'h-[calc(100%-80px)]')}>
      <div className="flex-col hidden h-full bg-black md:flex gap-y-2 w-[300px] p-2">
        <Box>
          <div className="flex flex-col px-5 py-4 gap-y-4 ">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={songs} />
        </Box>
      </div>

      <main className="flex-1 h-full py-2 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Sidebar;
