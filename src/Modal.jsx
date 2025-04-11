import React, { useEffect } from 'react';

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
          <div className="video-container">
            <div className="trailer-message">
              <h3>Watch Trailer</h3>
              <p>Click the button below to watch the trailer on YouTube</p>
              <a 
                href={youtubeSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-button"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" className="youtube-icon">
                  <path fill="currentColor" d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
                </svg>
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 