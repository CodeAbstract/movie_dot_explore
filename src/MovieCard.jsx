import React from "react"

const DEFAULT_POSTER = 'https://via.placeholder.com/400'

const MovieCard = ({movie}) => {
  return (
    <div className='movie' key={movie.id}>
      <div>
        <p>{movie.name}</p>
      </div>  
      
      <div>
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : DEFAULT_POSTER}
        />
      </div>

      <div>
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>
      </div>
    </div>
  )
};

export default MovieCard;