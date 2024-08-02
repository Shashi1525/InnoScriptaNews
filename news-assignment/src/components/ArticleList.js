import React, { useState, useEffect } from 'react';
import Article from './Article';

const ArticleList = ({ articles }) => {
  const [newArticles, setNewArticles] = useState([]);

 
  useEffect(() => {
    if (articles) {
      setNewArticles(articles);
    }
  }, [articles]); 


  return (
    <div className='article-wrapper'>
      {newArticles.map((article, index) => (
        <Article key={index} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;