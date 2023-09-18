import { useState, useEffect } from 'react';
import Quote from './components/Quote';
import Author from './components/Author';
import { TfiReload } from 'react-icons/tfi';
import { ColorRing } from 'react-loader-spinner';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const API_URL_RANDOM =
    'https://quote-garden.onrender.com/api/v3/quotes/random';

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = () => {
    fetch(API_URL_RANDOM)
      .then((response) => response.json())
      .then((json) => {
        setQuote(json.data[0].quoteText);
        setAuthor(json.data[0].quoteAuthor);
        setGenre(json.data[0].quoteGenre);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  const handleClick = () => {
    getQuote();
  };

  if (error) {
    return <h1 className="error">Error: {error}</h1>;
  }

  return (
    <div className="wrapper">
      <button onClick={handleClick} className="button">
        <span>random</span>
        <TfiReload />
      </button>
      <div className="main">
        {isLoading ? (
          <ColorRing
            visible={true}
            height="120"
            width="120"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        ) : (
          <>
            {' '}
            <Quote quoteText={quote} />
            <Author quoteAuthor={author} quoteGenre={genre} />
          </>
        )}
      </div>
      <footer>
        created by <a href="https://github.com/VladkaG">Vladyslava</a> -
        devChallenges.io
      </footer>
    </div>
  );
}
export default App;
