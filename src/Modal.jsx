import React, { useEffect } from 'react';

const DEFAULT_POSTER = 'https://placehold.co/400';

const Modal = ({ isOpen, onClose, movie }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  const searchQuery = encodeURIComponent(`${movie.Title} ${movie.Year} official trailer`);
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <h2>{movie.Title} ({movie.Year})</h2>
        </div>
        <div className="modal-body">
          <div className="movie-details-grid">
            <div className="movie-poster">
              <img 
                src={movie.Poster !== 'N/A' ? movie.Poster : DEFAULT_POSTER + '?text=' + movie.Title}
                alt={movie.Title}
              />
            </div>
            <div className="movie-info-details">
              {movie.imdbRating && (
                <div className="detail-row">
                  <span className="detail-label">Rating</span>
                  <span className="detail-value">{movie.imdbRating}/5</span>
                </div>
              )}
              
              {movie.Runtime && (
                <div className="detail-row">
                  <span className="detail-label">Runtime</span>
                  <span className="detail-value">{movie.Runtime}</span>
                </div>
              )}
              
              {movie.Director && (
                <div className="detail-row">
                  <span className="detail-label">Director</span>
                  <span className="detail-value">{movie.Director}</span>
                </div>
              )}
              
              {movie.Genre && (
                <div className="detail-row">
                  <span className="detail-label">Genres</span>
                  <div className="detail-value genres-list">
                    {typeof movie.Genre === 'string' 
                      ? movie.Genre.split(', ').map((genre, index) => (
                          <span key={index} className="genre-tag">{genre}</span>
                        ))
                      : movie.Genre.map((genre, index) => (
                          <span key={index} className="genre-tag">{genre}</span>
                        ))
                    }
                  </div>
                </div>
              )}
              
              {movie.Plot && (
                <div className="detail-row">
                  <span className="detail-label">Plot</span>
                  <p className="detail-value plot-text">{movie.Plot}</p>
                </div>
              )}

              <div className="detail-row">
                <a 
                  href={youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="youtube-button"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" className="youtube-icon">
                    <path fill="currentColor" d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
                  </svg>
                  Watch Trailer
                </a>
              </div>
              
              {movie.Actors && (
                <div className="detail-row">
                  <span className="detail-label">Cast</span>
                  <span className="detail-value">{movie.Actors}</span>
                </div>
              )}
              
              {movie.Awards && (
                <div className="detail-row">
                  <span className="detail-label">Awards</span>
                  <span className="detail-value">{movie.Awards}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 