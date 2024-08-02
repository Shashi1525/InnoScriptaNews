
import React from 'react';

const Article = ({ article }) => {
  const { title, description, url, source, authorName, publishedAt, author} = article;
  return (
    <div className='author_list'>
      <h2>{title}</h2>
      <p className='description'>{description} </p>
      <p className='link-a'>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Read more 
        </a>
      </p>
      <p className='source'><span>Source:</span> {source?.name || article.section || article.source}</p>
      {authorName ? <p className='author'><span>Author: </span>{authorName}</p> :  <p className='author'><span>Author: </span>{author}</p>}
      {publishedAt && <p className='date'><span>Date: </span>{publishedAt.split('T')[0]}</p>}
    </div>
  );
};

export default Article;
