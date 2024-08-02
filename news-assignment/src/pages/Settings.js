import React, { useState , useEffect} from 'react';
import PreferencesForm from '../components/PreferencesForm';
import { fetchArticles } from '../services/newsService';

const Settings = () => {
  const [preferences, setPreferences] = useState({ sources: [], categories: [], authors: [] });
  const [articles, setArticles] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: value,
    }));
  };
  useEffect(() => {
    const getArticles = async () => {
      try {
        const articles = await fetchArticles(null,null,preferences.categories, preferences.sources, preferences.authors);
        setArticles(articles);
      } catch (error) {
        console.error('Failed to fetch articles:', error.message);
      }
    };

    getArticles();
  }, [preferences]);

  const handlePreferencesChange = (name, values) => {
    setPreferences(prevPreferences => ({ ...prevPreferences, [name]: values }));
  };

  return (
    <div className='preferences-form '>
      <PreferencesForm onPreferencesChange={handlePreferencesChange} articles={articles}/>
    </div>
  );
};

export default Settings;