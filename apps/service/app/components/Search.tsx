'use client';

import { useState } from 'react';

const Search = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col items-center justify-center w-full bg-red-50">
      <div>다른 사람을 검색해보세요!</div>

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
};

export default Search;
