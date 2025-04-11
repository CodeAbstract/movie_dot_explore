import { useEffect, useState } from 'react';

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import Modal from './Modal';
import logo from './reelRadarLogo.svg';

const OMDB_API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;
const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w500';

const TOP_MOVIE_OPTIONS = [
  { id: 'featured', count: 1, time: 'day', label: 'Featured Movie' },
  { id: 'week5', count: 5, time: 'week', label: 'Weekly Top 5' },
  { id: 'month20', count: 20, time: 'week', label: 'Monthly Top 20' }
];

function App() {
  const [movies, setMovies] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [viewMode, setViewMode] = useState('featured');
  const [topCount, setTopCount] = useState(5);
  const [timeWindow, setTimeWindow] = useState('week');
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  useEffect(() => {
    // Set initial theme based on user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    
    // Set initial view to featured movie
    setViewMode('featured');
    // Fetch featured movie on initial load
    fetchFeaturedMovie();
  }, []);

  useEffect(() => {
    if (viewMode === 'week5' || viewMode === 'month20') {
      fetchTopMovies();
    }
  }, [viewMode, topCount, timeWindow]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', !isDarkMode ? 'dark' : 'light');
  };

  const fetchTopMovies = async () => {
    setLoading(true);
    try {
      console.log('Fetching movies with:', { timeWindow, topCount });
      // TMDB trending only supports 'day' or 'week' time windows
      const response = await fetch(
        `${TMDB_API_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const data = await response.json();
      console.log('API Response:', { status: response.status, results: data.results?.length });
      
      if (data.results) {
        const moviesWithDetails = data.results.slice(0, topCount).map(movie => ({
          Title: movie.title,
          Year: new Date(movie.release_date).getFullYear().toString(),
          Poster: movie.poster_path ? `${TMDB_IMG_URL}${movie.poster_path}` : 'N/A',
          Type: 'movie',
          imdbRating: (movie.vote_average / 2).toFixed(1), // Convert to 5-star rating
          Genre: movie.genre_ids.slice(0, 3).join(', '), // We'll need to map these IDs to names in a production app
          Plot: movie.overview,
          tmdbId: movie.id
        }));
        console.log('Processed movies:', moviesWithDetails.length);
        setMovies(moviesWithDetails);
      } else {
        console.error('No results in API response:', data);
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching top movies:', error);
      setMovies([]);
    }
    setLoading(false);
  };

  const fetchFeaturedMovie = async () => {
    setFeaturedLoading(true);
    try {
      const response = await fetch(
        `${TMDB_API_URL}/trending/movie/day?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        // Get a random movie from today's top 20
        const randomIndex = Math.floor(Math.random() * Math.min(data.results.length, 10));
        const movie = data.results[randomIndex];
        
        setFeaturedMovie({
          Title: movie.title,
          Year: new Date(movie.release_date).getFullYear().toString(),
          Poster: movie.poster_path ? `${TMDB_IMG_URL}${movie.poster_path}` : 'N/A',
          BackdropPath: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
          Type: 'movie',
          imdbRating: (movie.vote_average / 2).toFixed(1),
          Genre: movie.genre_ids.slice(0, 3).join(', '),
          Plot: movie.overview,
          tmdbId: movie.id
        });
      }
    } catch (error) {
      console.error('Error fetching featured movie:', error);
    }
    setFeaturedLoading(false);
  };

  const searchMovies = async (title) => {
    setLoading(true);
    try {
      const response = await fetch(`${OMDB_API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Search) {
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const detailResponse = await fetch(`${OMDB_API_URL}&i=${movie.imdbID}&plot=short`);
            const detailData = await detailResponse.json();
            return {
              ...movie,
              ...detailData
            };
          })
        );
        setMovies(detailedMovies);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      setViewMode('search');
      searchMovies(searchKeyword);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleTopMoviesClick = (option) => {
    setTopCount(option.count);
    setTimeWindow(option.time);
    setViewMode(option.id);
  };

  const getLoadingText = () => {
    if (viewMode === 'search') return 'Searching for movies...';
    const option = TOP_MOVIE_OPTIONS.find(opt => opt.id === viewMode);
    return `Loading ${option?.label || 'movies'}...`;
  };

  return (
    <div className='app'>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {isDarkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <div className="app-header">
        <img src={logo} alt="Reel Radar" className="app-logo" />
        <div className="header-right">
          <div className="view-toggle">
            <div className="top-movies-buttons">
              {TOP_MOVIE_OPTIONS.map(option => (
                <button 
                  key={option.id}
                  className={`toggle-button ${viewMode === option.id ? 'active' : ''}`}
                  onClick={() => handleTopMoviesClick(option)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button 
              className={`toggle-button ${viewMode === 'search' ? 'active' : ''}`}
              onClick={() => setViewMode('search')}
            >
              Search Movies
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'featured' && featuredMovie && !featuredLoading && (
        <div className="featured-page">
          <div 
            className="featured-movie" 
            onClick={() => handleMovieClick(featuredMovie)}
            style={{
              backgroundImage: featuredMovie.BackdropPath ? 
                `url(${featuredMovie.BackdropPath})` : 'none'
            }}
          >
            <div className="featured-content">
              <div className="featured-info">
                <h2>{featuredMovie.Title}</h2>
                <p className="featured-plot">{featuredMovie.Plot}</p>
                <div className="featured-meta">
                  <span className="featured-year">{featuredMovie.Year}</span>
                  <span className="featured-rating">★ {featuredMovie.imdbRating}/5</span>
                </div>
                <button className="featured-button">View Details</button>
              </div>
              <div className="featured-poster">
                <img src={featuredMovie.Poster} alt={featuredMovie.Title} />
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'search' && (
        <form className='search' onSubmit={handleSearch}>
          <input
            placeholder='Search for movies'
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button type="submit" className="search-button">
            <svg className="search-icon" viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <span>Search</span>
          </button>
        </form>
      )}

      {loading ? (
        <div className='loading'>
          <div className='loading-spinner'></div>
          <p>{getLoadingText()}</p>
        </div>
      ) : movies && movies.length > 0 && viewMode !== 'featured' ? (
        <div className='container'>
          {movies.map((movie, index) => (
            <MovieCard 
              key={movie.imdbID || movie.tmdbId} 
              movie={movie}
              onClick={() => handleMovieClick(movie)}
              rank={viewMode !== 'search' ? index + 1 : undefined}
            />
          ))}
        </div>
      ) : !loading && viewMode !== 'featured' && (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}

      <Modal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        movie={selectedMovie}
      />
    </div>
  );
}

export default App;
