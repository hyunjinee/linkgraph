'use client';

import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import clsx from 'clsx';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ArrowRightOnRectangleIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

export default function SignInButton() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Menu as="div" className="relative">
          <Menu.Button>
            {session?.user?.image ? (
              <div className="relative w-10 h-10">
                <Image
                  src={session.user.image}
                  alt={session.user.name || ''}
                  className="inline-block rounded-full"
                  fill
                />
              </div>
            ) : (
              <span className="inline-block w-8 h-8 overflow-hidden rounded-full bg-stone-100">
                <svg className="w-full h-full text-stone-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            )}
          </Menu.Button>
          <Transition
            enter="transition duration-150 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-150 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="absolute right-0 flex flex-col py-6 mt-1 text-white origin-top-right shadow-lg bg-react dark:text-react w-96 rounded-xl focus:outline-none dark:bg-white">
              <div className="flex gap-4 px-6 mb-4 text-sm">
                {session?.user?.image ? (
                  <div className="relative w-10 h-10">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || ''}
                      className="inline-block rounded-full"
                      fill
                    />
                  </div>
                ) : (
                  <span className="inline-block w-8 h-8 overflow-hidden rounded-full bg-stone-100">
                    <svg className="w-full h-full text-stone-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                )}
                <div>
                  <p className="font-medium text-stone-600">{session.user?.name || 'User name'}</p>
                  <p className="text-stone-400">{session.user?.email}</p>
                </div>
              </div>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/profile"
                    className={clsx(
                      active && 'bg-stone-700/50 dark:bg-stone-200',
                      'inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-400 dark:text-stone-500',
                    )}
                  >
                    <Cog8ToothIcon className="w-5 h-5 text-stone-400" />
                    <span>Manage Account</span>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={clsx(
                      active && 'bg-stone-700/50 dark:bg-stone-200',
                      'inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-400 dark:text-stone-500',
                    )}
                    onClick={() => signOut()}
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 text-stone-400" />
                    <span>Sign Out</span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <button
          className="px-3 py-1 text-sm border rounded-md border-stone-300 dark:border-stone-600"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </>
  );
}
