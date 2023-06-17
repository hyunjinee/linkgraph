import { ChevronLeft, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type SidebarProps = {
  isSidebarOpened: boolean;
  setSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isSidebarOpened, setSidebarOpened }: SidebarProps) => {
  return (
    <aside
      className={` hidden h-full w-72 overflow-hidden bg-gray-100 p-4 shadow-[inset_-7px_0_9px_-7px_rgba(0,0,0,0.1)] sm:block ${
        !isSidebarOpened && 'sm:hidden'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex">
          <div className="shrink-0">
            <Link href={'/'} className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-200 text-white">
              P
            </Link>
          </div>
          <div className="ml-1 grow bg-yellow-50">profile</div>
        </div>
        <div>mainmenu</div>
        <div>
          <div className="flex justify-end">
            <button
              className="flex h-12 w-12 items-center rounded hover:bg-gray-200"
              onClick={() => setSidebarOpened(false)}
            >
              <ChevronLeft className="h-3 w-3" />
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
