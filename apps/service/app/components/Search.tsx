'use client';

import { useState } from 'react';
import { SearchIcon } from 'lucide-react';

const Search = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="p-3 sm:w-[360px] h-[44px] w-full rounded-lg bg-[#fafafa] flex items-center overflow-hidden">
      <SearchIcon />
      <input
        className="w-full h-full p-3 outline-none bg-[#fafafa]"
        placeholder="다른 유저를 검색해보세요!"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul></ul>
    </div>
  );
};

export default Search;
