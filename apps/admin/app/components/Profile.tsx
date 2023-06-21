'use client';

import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const items: MenuProps['items'] = [
  {
    label: (
      <Link href="/profile" className="inline-flex min-w-[8rem] items-center gap-1">
        <User width={16} height={16} />
        내프로필
      </Link>
    ),
    key: '0',
  },
  {
    label: (
      <a className="inline-flex items-center gap-1" onClick={() => signOut()}>
        <LogOut width={16} height={16} />
        로그아웃
      </a>
    ),
    key: '1',
  },
];

const Profile = () => {
  const session = useSession();

  return (
    <>
      <div className="ml-2">관리자</div>
      <Dropdown menu={{ items }} trigger={['click']}>
        <button className="flex items-center px-2 text-gray-600 transition-all duration-300 rounded hover:bg-gray-200">
          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap sm:max-w-[12rem]">
            leehj0110@kakao.com
          </span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </Dropdown>
    </>
  );
};

export default Profile;
