import { useEffect, useState } from 'react';

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = ''

function App() {
  const [movies, setMovies] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('spiderman');
  }, []);

  return (
    <div className='app'>
      <h1>Movie.Explore()</h1>

      <div className='search'>
        <input
          placeholder='Search for movies'
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <img 
          src={SearchIcon}
          alt='Search'
          onClick={(e) => searchMovies(searchKeyword)}
        />
      </div>

      {movies && movies.length > 0
            ? (
              <div className='container'>
                {
                  movies.map((movie) => (
                    <MovieCard movie={movie}/>
                  ))
                }
              </div>
            ) : (
              <div className='empty'>
                <h2>No movies found</h2>
              </div>
            )}
    </div>
  );
}

export default App;
