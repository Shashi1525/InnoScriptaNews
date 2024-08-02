import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../services/newsService';
import ArticleList from '../components/ArticleList';
import Search from '../components/Search';
import Filter from '../components/Filter';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({ query: '', date: '', category: '', source: '' });

  useEffect(() => {
    const getArticles = async () => {
      try {
        const articles = await fetchArticles(filters.query, filters.date, filters.category, filters.source);
        setArticles(articles);
        console.log('articles', articles)
      } catch (error) {
        console.error('Failed to fetch articles:', error.message);
      }
    };
    getArticles();
  }, [filters]);

  const handleSearch = (keyword) => {
    setFilters((prevFilters) => ({ ...prevFilters, query: keyword }));
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };
  if(!articles){
    return (<div>Loading...</div>)
  }
  return (
    <div className="container">
      <div className='filter_option_search'>
        <Search onSearch={handleSearch} />
        {articles && 
            <>
              <Filter onFilterChange={handleFilterChange} />
            </>
        }
        </div>
        <div className="articles_text"> Search Highlights </div>
        {articles &&  <ArticleList articles={articles} />}
    </div>
  );
};

export default Home;
