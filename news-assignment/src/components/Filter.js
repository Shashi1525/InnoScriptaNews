import React from 'react';

const Filter = ({ onFilterChange }) => {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <div className='filter-container'>
      <label>
      <span> Date:</span>
        <input type="date" name="date" onChange={handleFilterChange} />
      </label>
      <label>
      <span>Category:</span>
        <select name="category" onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="world">world</option>
          <option value="politics">politics</option>
          <option value="sport">sport</option>
          <option value="business">business</option>
          <option value="environment">environment</option>
          <option value="technology">Technology</option>
        </select>
      </label>
      <label>
      <span>Source:</span>
        <select name="source" onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="bbc-news">BBC News</option>
          <option value="guardian">The Guardian</option>
          <option value="nyt">New York Times</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
