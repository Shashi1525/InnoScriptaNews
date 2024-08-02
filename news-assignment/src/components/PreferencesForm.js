import React, { useState } from 'react';
import Article from './Article';


const PreferencesForm = ({ onPreferencesChange , articles}) => {
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const handleSourceChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedSources(value);
    onPreferencesChange('sources', value);
  };

  const handleCategoryChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedCategories(value);
    onPreferencesChange('categories', value);
  };

  const handleAuthorChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedAuthors(value);
    onPreferencesChange('authors', value);
  };
  return (
    <>
      <div className='preference_wraper'>
        <h3>Preferences</h3>
        <div className='pref-label'>
          <label>
            <span>Sources:</span>
            <select multiple onChange={handleSourceChange}>
              <option value="bbc-news">BBC News</option>
              <option value="cnn">CNN</option>
              <option value="the-guardian">The Guardian</option>
              {/* Add more sources as needed */}
            </select>
          </label>
          <label>
          <span>Categories:</span>
            <select multiple onChange={handleCategoryChange}>
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
            </select>
          </label>
          <label>
          <span>Authors:</span>
            <select multiple onChange={handleAuthorChange}>
            {articles.map((article, index) => (
              article.author ? (
                <option key={index} value={article.author}>{article.author}</option>
              ) : null
            ))}
            </select>
          </label>
        </div>
      </div>
      <div className='article-wrapper'>
        {articles.map((article, index) => (
          <Article key={index} article={article} />
        ))}
      </div>
    </>
  );
};

export default PreferencesForm;
