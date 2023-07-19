'use client';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
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
    <div className="flex h-full">
      <div className="flex-col hidden h-full bg-black md:flex gap-y-2 w-[300px] p-2">
        <Box>
          <div className="flex flex-col px-5 py-4 gap-y-4 ">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library />
        </Box>
      </div>

      <main className="flex-1 h-full py-2 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Sidebar;
