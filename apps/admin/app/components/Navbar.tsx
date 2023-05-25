'use client';

import { Disclosure } from '@headlessui/react';
import { getServerSession } from 'next-auth';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Playground', href: '/playground' },
];

const Navbar: React.FC = () => {
  return <Disclosure>hi</Disclosure>;
};

export default Navbar;
