import React, { useState, useEffect } from "react"

const DEFAULT_POSTER = 'https://placehold.co/400'

const MovieCard = ({movie, onClick, rank}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setImageLoaded(false);
  }, [movie.Poster]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setTimeout(() => {
      setIsLoading(false);
    }, rank ? rank * 400 : 0); // Increased delay from 200ms to 400ms per rank
  };

  return (
    <div 
      className={`movie animate-item ${!isLoading ? 'reveal' : ''}`} 
      style={{ 
        animationDelay: `${rank * 0.4}s`,  // Increased from 0.2s to 0.4s
        transitionDelay: `${rank * 0.4}s`   // Added transition delay
      }}
      onClick={!isLoading ? onClick : undefined}
    >
      {rank && (
        <div className='movie-rank'>
          <span>#{rank}</span>
        </div>
      )}
      <div className="movie-image-container">
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : DEFAULT_POSTER + '?text=' + movie.Title}
          alt={movie.Title}
          onLoad={handleImageLoad}
          style={{ 
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.6s ease'  // Increased from default
          }}
        />
        {isLoading && (
          <div className="movie-loading">
            <div className="loading-spinner"></div>
            <span>Loading...</span>
          </div>
        )}
      </div>
      <div className={`movie-info ${!isLoading ? 'show' : ''}`}>
        <div className='movie-header'>
          <span className='movie-type'>{movie.Type}</span>
          <span className='movie-year'>{movie.Year}</span>
        </div>
        
        <h3 className='movie-title'>{movie.Title}</h3>
        
        <div className='movie-details'>
          {movie.imdbRating && (
            <div className='movie-rating'>
              <span className='rating-label'>Rating</span>
              <span className='rating-value'>{movie.imdbRating}/5</span>
            </div>
          )}
          
          {movie.Genre && (
            <div className='movie-genres'>
              {typeof movie.Genre === 'string' 
                ? movie.Genre.split(', ').map((genre, index) => (
                    <span key={index} className='genre-tag'>{genre}</span>
                  ))
                : movie.Genre.map((genre, index) => (
                    <span key={index} className='genre-tag'>{genre}</span>
                  ))
              }
            </div>
          )}
        </div>

        {movie.Plot && (
          <p className='movie-plot'>{movie.Plot}</p>
        )}

        <div className='movie-actions'>
          <button className='watch-button'>
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  )
};

export default MovieCard;