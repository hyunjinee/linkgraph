'use client';

import { useState } from 'react';

const Search = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="sm:w-[360px] w-full border-8">
      <input
        className="w-full h-[44px] p-3"
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
