import Link from 'next/link';
import React from 'react';
import type { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

type SidebarItemProps = {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
};

export default function SidebarItem({ icon: Icon, label, active, href }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        `
      flex
      flex-row
      h-auto
      items-center
      w-full
      gap-x-4
      text-md
      font-medium
      cursor-pointer
      hover:text-white
      transition
      text-neutral-400
      py-1
    `,
        active && 'text-white',
      )}
    >
      <Icon size={26} />
      <p className="w-full truncate">{label}</p>
    </Link>
  );
}
