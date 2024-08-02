
import axios from 'axios';

const NEWS_API_KEY = 'd753c50f522a4056a9871d9f7d93d7a1';
const GUARDIAN_API_KEY = '8d72b3d0-55d5-4312-a14e-afee42a28a5f';
const NYT_API_KEY = 'hApyN0hFxsTGfB8LYXBMKeQHGA6x3832';

const fetchNewsAPIArticles = async (query, date, category, source, author) => {
  if(query == ""){
    query = "Top News"
  }
  let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`;
  if (date) url = "https://newsapi.org/v2/everything?q="+query+"&from="+date+"&sortBy=publishedAt&apiKey="+NEWS_API_KEY+"";
  if (category) url = "https://newsapi.org/v2/top-headlines?country=us&category="+category+"&apiKey="+NEWS_API_KEY+""
  if (source) url = "https://newsapi.org/v2/top-headlines?sources="+source+"&apiKey="+NEWS_API_KEY+"";
  const response = await axios.get(url);
  if(response.data) return response.data.articles;
};

const fetchGuardianArticles = async (query, date, category, source, author) => {
  if(query == null){
    query = ""
  }
  let url = `https://content.guardianapis.com/search?q=${query}&api-key=${GUARDIAN_API_KEY}`;
  if(window.location.pathname !== '/search'){
    if (date !== "" && date !== null) url += `&from-date=${date}`;
    if (category && category.length > 0) url += `&section=${category}`;
    if (source && source.length > 0) url += `&sources=${source}`;
    if (author && author.length > 0) url += `&authors=${author}`;
  }
  const responseGaurd = await axios.get(url);
  if (responseGaurd.data) return responseGaurd.data.response.results.map(article => ({
    source: { name: 'The Guardian' },
    authorName: article.webTitle,
    title: article.webTitle,
    description: article.sectionName,
    url: article.webUrl,
    publishedAt: article.webPublicationDate,
    id:"guardian",
    category : article.sectionId,
    author: author ? article.sectionName : "",
  }));
};

const fetchNYTArticles = async (query, date, category, source, author) => {
  if(query == null){
    query = ""
  }
  let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${NYT_API_KEY}`;
  if(window.location.pathname !== '/search'){
    if (date !== "" && date !== null) {
      try{
        date = date.replace(/-/g, '')
      }catch(e){console.log("")}
      url += `&begin_date=${date}`;
    }
    if (category && category.length > 0) url += `&fq=news_desk:(${category})`;
    if (source && source.length > 0) url += `&sources=${source}`;
    if (author && author.length > 0) {
      // url += `&authors=${author.join(',')}`;
      url += `&fq=${author.join(',')}`;
      // &fq={filter}
    }
  }
  const responseNT = await axios.get(url);
  if (responseNT.data) return responseNT.data.response.docs.map(article => ({
    source: { name: 'The New York Times' },
    authorName: article.byline.original,
    title: article.headline.main,
    description: article.abstract,
    url: article.web_url,
    publishedAt: article.pub_date,
    author: author ? article.byline?.person[0]?.firstname : "",
    id:"nyt",
  }));
};

const fetchArticles = async (query, date, category, source, author) => {
  try {
    const [newsAPIArticles, guardianArticles, nytArticles] = await Promise.all([
      fetchNewsAPIArticles(query, date, category, source, author),
      fetchGuardianArticles(query, date, category, source, author),
      fetchNYTArticles(query, date, category, source, author)
    ]);
    return [...newsAPIArticles, ...guardianArticles, ...nytArticles];
  } catch (error) {
    console.error('Error fetching articles:', error.response?.data || error.message);
    throw error;
  }
};

export { fetchArticles };