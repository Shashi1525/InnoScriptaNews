import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className='search-container'>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for articles"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
