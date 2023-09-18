import { useState, useEffect } from 'react';
import Quote from './components/Quote';
import Author from './components/Author';
import './App.css';


function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');

  const API_URL_RANDOM =
    'https://quote-garden.onrender.com/api/v3/quotes/random';

  useEffect(() => {
    fetch(API_URL_RANDOM)
      .then((response) => response.json())
      .then((json) => {
        setQuote(json.data[0].quoteText);
        setAuthor(json.data[0].quoteAuthor);
        setGenre(json.data[0].quoteGenre);
      });
  }, []);

  return (
    <div className="App">
      <Quote quoteText={quote} />
      <Author quoteAuthor={author} quoteGenre={genre}/>
    </div>
  );
}
export default App;
