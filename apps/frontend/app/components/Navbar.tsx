'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useContext, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import LinkGraphIcon from '~/components/LinkGraphIcon';
import { Session } from 'next-auth';
import { AuthContext } from './Core';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Playground', href: '/playground' },
];

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

const Navbar = () => {
  const session = useContext(AuthContext);

  console.log(session);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

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
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 cursor-pointer items-center" onClick={() => router.push('/')}>
                    <LinkGraphIcon />
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm hover:ring-2 hover:ring-slate-500 hover:ring-offset-2 focus:outline-none ">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={session?.user?.image || 'https://avatar.vercel.sh/leerob'}
                          height={32}
                          width={32}
                          alt={session?.user?.name || 'avatar'}
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {session?.user ? (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
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
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
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
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'flex w-full px-4 py-2 text-sm text-gray-700',
                                )}
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
                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? 'border-slate-500 bg-slate-50 text-slate-700'
                        : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
                      'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
                    )}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4">
                {session?.user ? (
                  <>
                    <div className="mt-3 space-y-1">
                      <button
                        onClick={() => signOut()}
                        className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      >
                        로그아웃
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={() => openModal()}
                      className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      로그인
                    </button>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
