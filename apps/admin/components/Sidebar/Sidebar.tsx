'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, MenuIcon } from 'lucide-react';

import Profile from './Profile';
import MainMenu from './MainMenu';
import { useState } from 'react';

const Sidebar = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);

  return (
    <>
      <aside
        className={`hidden h-full w-72 shrink-0 overflow-hidden bg-gray-100 p-4 shadow-[inset_-7px_0_9px_-7px_rgba(0,0,0,0.1)] sm:block ${
          !isSidebarOpened && 'sm:hidden'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex">
            <div className="shrink-0">
              <Link href="/" className="flex items-center justify-center w-12 h-12 text-white bg-red-200 rounded-lg">
                {/* session user name으로 바꾸기 */}P
              </Link>
            </div>
            <div className="ml-1 grow">
              <Profile />
            </div>
          </div>
          <div className="grow">
            <MainMenu />
          </div>
          <div>
            <div className="flex justify-end">
              <button
                className="flex items-center w-12 h-12 border-0 rounded cursor-pointer hover:bg-gray-200"
                onClick={() => setIsSidebarOpened(false)}
              >
                <ChevronLeft className="w-3 h-3" />
                <MenuIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>
      {!isSidebarOpened && (
        <div className="fixed bottom-5 left-5">
          <button
            className="flex items-center justify-center w-12 h-12 bg-white border rounded opacity-50 cursor-pointer enable-transition hover:opacity-100"
            onClick={() => setIsSidebarOpened(true)}
          >
            <MenuIcon className="w-5 h-5" />
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
