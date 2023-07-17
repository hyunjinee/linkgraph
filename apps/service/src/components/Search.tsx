'use client';

import { useState } from 'react';

import { SearchIcon, X } from 'lucide-react';
import Spinner from './Spinner';
import { useQuery } from '@tanstack/react-query';

const Search = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = 'temp';
  // const { isLoading, data } = useQuery({
  //   queryKey: ['search', search],
  //   queryFn: () => {
  //     return Promise.resolve(1);
  //     // return fetch(`/api/search?search=${search}`).then((res) => res.json());
  //   },
  //   enabled: debouncedSearch.length > 100,
  // });

  let isLoading = false;

  return (
    <div className="sm:w-[360px] h-[44px] w-full rounded-lg bg-[#fafafa] overflow-hidden">
      <div className="flex items-center justify-center p-3 ">
        <SearchIcon />
        <input
          className="w-full h-full outline-none bg-[#fafafa] ml-3"
          placeholder="다른 유저를 검색해보세요!"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* {isLoading ? <X size={25} className="cursor-pointer hover:text-pink-300" /> : <Spinner size={6} />} */}
      </div>

      <ul></ul>
    </div>
  );
};

export default Search;
