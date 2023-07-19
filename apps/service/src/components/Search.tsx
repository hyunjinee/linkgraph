'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SearchIcon, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import Spinner from './Spinner';
import { useDebounce } from '~/hooks/useDebounce';
import type { User } from '.prisma/client';
import { cn } from '~/lib/utils';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword);
  const searchParams = new URLSearchParams({ keyword: debouncedKeyword });

  const { data: users, isFetching } = useQuery<User[]>({
    queryKey: ['search', searchParams.get('keyword')],
    queryFn: async () => {
      return fetch(`/api/search?${searchParams.toString()}`).then((res) => res.json());
    },
    enabled: debouncedKeyword.length > 0,
  });

  return (
    <div
      className={cn(
        'sm:w-[360px] h-[44px] w-full rounded-lg bg-[#fafafa] relative',
        users && 'rounded-br-none rounded-bl-none',
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
      {users && users.length > 0 && (
        <ul className="absolute w-full z-50 bg-[#fafafa] flex flex-col gap-4 p-4 top-[44px] rounded-bl-lg rounded-br-lg">
          {users.map((user) => (
            <li key={user.id} className="flex items-center">
              <Image src={user.profileImage || '/profile.png'} width={40} height={40} alt="profile image" />
              <div className="ml-2 text-xl">{user.name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
