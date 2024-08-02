import React, { useState } from 'react';
import Search from '../components/Search';
import ArticleList from '../components/ArticleList';
import { fetchArticles } from '../services/newsService';

const SearchPage = () => {
  const [articles, setArticles] = useState([]);

  const handleSearch = async (keyword) => {
    const articles = await fetchArticles('', keyword);
    setArticles(articles);
  };
  if(!articles){
    return <div>Loading Articles...</div>
  }
  return (
    <div className='search-article'>
      <Search onSearch={handleSearch} />
      <ArticleList articles={articles} />
    </div>
  );
};

export default SearchPage;