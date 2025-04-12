import { rest } from 'msw';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const OMDB_BASE_URL = 'http://www.omdbapi.com';

export const handlers = [
  // Mock TMDB trending movies endpoint
  rest.get(`${TMDB_BASE_URL}/trending/movie/week`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        page: 1,
        results: [
          {
            id: 1,
            title: 'Test Movie 1',
            poster_path: '/test1.jpg',
            vote_average: 8.5,
            release_date: '2024-01-01',
            overview: 'Test movie 1 overview'
          },
          {
            id: 2,
            title: 'Test Movie 2',
            poster_path: '/test2.jpg',
            vote_average: 7.5,
            release_date: '2024-01-02',
            overview: 'Test movie 2 overview'
          }
        ],
        total_pages: 1,
        total_results: 2
      })
    );
  }),

  // Mock TMDB trending movies endpoint for monthly
  rest.get(`${TMDB_BASE_URL}/trending/movie/month`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        page: 1,
        results: [
          {
            id: 3,
            title: 'Monthly Movie 1',
            poster_path: '/monthly1.jpg',
            vote_average: 9.0,
            release_date: '2024-02-01',
            overview: 'Monthly movie 1 overview'
          },
          {
            id: 4,
            title: 'Monthly Movie 2',
            poster_path: '/monthly2.jpg',
            vote_average: 8.0,
            release_date: '2024-02-02',
            overview: 'Monthly movie 2 overview'
          }
        ],
        total_pages: 1,
        total_results: 2
      })
    );
  }),

  // Mock OMDB movie details endpoint
  rest.get(OMDB_BASE_URL, (req, res, ctx) => {
    const movieId = req.url.searchParams.get('i') || '1';
    const mockMovies = {
      '1': {
        Title: 'Test Movie 1',
        Year: '2024',
        Rated: 'PG-13',
        Runtime: '120 min',
        Genre: 'Action, Drama',
        Director: 'Test Director',
        Plot: 'Test movie plot',
        Poster: 'test-poster.jpg',
        imdbRating: '8.5',
        Response: 'True'
      }
    };

    return res(
      ctx.status(200),
      ctx.json(mockMovies[movieId] || {
        Response: 'False',
        Error: 'Movie not found!'
      })
    );
  })
]; 