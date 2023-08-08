'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { SearchIcon, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@hyunjin/hooks';

import type { User } from '.prisma/client';
import Spinner from './Spinner';
import { cn } from '~/utils/className';
import { useOnClickOutside } from '~/hooks/useOnClickOutside';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword);
  const searchParams = new URLSearchParams({ keyword: debouncedKeyword });
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const { data: users, isFetching } = useQuery<User[]>({
    queryKey: ['search', searchParams.get('keyword')],
    queryFn: async () => fetch(`/api/search?${searchParams.toString()}`).then((res) => res.json()),
    enabled: debouncedKeyword.length > 0,
  });

  useOnClickOutside(searchContainerRef, () => setOpen(false));

  useEffect(() => {
    if (users && users.length > 0) {
      setOpen(true);
    }
  }, [users]);

  return (
    <div
      ref={searchContainerRef}
      className={cn(
        'sm:w-[360px] h-[44px] w-full rounded-lg bg-[#fafafa] relative',
        open && 'rounded-br-none rounded-bl-none',
      )}
    >
      <div className="flex items-center justify-center h-full p-3 ">
        <SearchIcon />
        <input
          className="w-full h-full outline-none bg-[#fafafa] ml-3"
          placeholder="다른 유저를 검색해보세요!"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {isFetching ? (
          <Spinner />
        ) : (
          <X size={25} className="transition cursor-pointer hover:text-pink-300" onClick={() => setKeyword('')} />
        )}
      </div>
      {open && (
        <ul className="absolute w-full z-50 bg-[#fafafa] flex flex-col gap-4 p-4 top-[44px] rounded-bl-lg rounded-br-lg">
          {users?.map((user) => (
            <Link key={user.id} href={user.url || user.id} className="cursor-pointer">
              <li className="flex items-center">
                <Image src={user.profileImage || '/profile.png'} width={40} height={40} alt="profile image" />
                <div className="ml-2 text-xl">{user.name}</div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
