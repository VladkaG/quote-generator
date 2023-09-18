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
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const [showAuthorQuotes, setShowAuthorQuotes] = useState(false);

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
        setAuthorQuotes([]);
        setShowAuthorQuotes(false);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  const handleClick = () => {
    getQuote();
  };

  const handleQuotesClick = () => {
    fetch(`https://quote-garden.onrender.com/api/v3/quotes?author=${author}`)
      .then((response) => response.json())
      .then((json) => {
        setAuthorQuotes(json.data.map((quoteData) => quoteData.quoteText));
        setShowAuthorQuotes(true);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return (
      <div className="loader">
        <ColorRing
          visible={true}
          height="120"
          width="120"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }

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
        {showAuthorQuotes ? (
          <div className="author-quotes">
            <h2>{author}</h2>
            <div>
              {authorQuotes.map((quote, index) => (
                <Quote key={index} quoteText={quote} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <Quote quoteText={quote} />
            <Author
              quoteAuthor={author}
              quoteGenre={genre}
              handleQuotesClick={handleQuotesClick}
            />
          </>
        )}
      </div>
      <footer>
        created by{' '}
        <a href="https://github.com/VladkaG" target="_blank" rel="noreferrer">
          Vladyslava
        </a>{' '}
        - devChallenges.io
      </footer>
    </div>
  );
}
export default App;
