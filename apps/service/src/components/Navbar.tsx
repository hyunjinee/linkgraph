'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react';
import { signIn, signOut } from 'next-auth/react';
import clsx from 'clsx';

import LinkGraphIcon from './LinkGraphIcon';
import { useAuth } from '../hooks/useAuth';
import Search from './Search';

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const session = useAuth();

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };

  const openModal = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow-sm">
        {({ open }) => (
          <>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center w-full">
                  <Link
                    href={'/'}
                    className="flex items-center justify-center flex-shrink-0 w-16 h-full cursor-pointer"
                  >
                    <LinkGraphIcon />
                  </Link>
                  <Search />
                </div>
                <div className="flex items-center sm:ml-6">
                  <Menu as="div" className="relative ml-3 shrink-0">
                    <Menu.Button className="flex text-sm bg-white rounded-full shrink-0 hover:ring-2 hover:ring-slate-500 hover:ring-offset-2 focus:outline-none ">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="object-cover rounded-full w-9 h-9 "
                        src={session?.user?.profileImage || 'https://avatar.vercel.sh/leerob'}
                        alt={session?.user?.name || 'avatar'}
                        width={32}
                        height={32}
                        priority
                        quality={100}
                      />
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {session?.user ? (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  className={clsx(
                                    active && 'bg-gray-100',
                                    'flex w-full px-4 py-2 text-sm text-gray-700',
                                  )}
                                  href={`${session?.user?.id}`}
                                >
                                  그래프
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  className={clsx(
                                    active && 'bg-gray-100',
                                    'flex w-full px-4 py-2 text-sm text-gray-700',
                                  )}
                                  href="/profile"
                                >
                                  프로필
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={clsx(
                                    active && 'bg-gray-100',
                                    'flex w-full px-4 py-2 text-sm text-gray-700',
                                  )}
                                  onClick={() => signOut()}
                                >
                                  로그아웃
                                </button>
                              )}
                            </Menu.Item>
                          </>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={clsx(active && 'bg-gray-100', 'flex w-full px-4 py-2 text-sm text-gray-700')}
                                onClick={() => {
                                  setIsLoginModalOpen(true);
                                }}
                              >
                                로그인
                              </button>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>

      {/* 로그인 모달 */}
      <Transition appear show={isLoginModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    로그인
                  </Dialog.Title>
                  {/* <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent you an email with all of the details of
                      your order.
                    </p>
                  </div> */}

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        signIn('google');
                        closeModal();
                      }}
                    >
                      구글로 로그인
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Navbar;
