import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from '../components/MovieCard';

const mockMovie = {
  title: 'Test Movie',
  poster_path: '/test-poster.jpg',
  vote_average: 8.5,
  release_date: '2024-01-01',
};

const mockOnClick = jest.fn();

describe('MovieCard Component', () => {
  beforeEach(() => {
    mockOnClick.mockClear();
  });

  test('renders movie card with correct information', () => {
    render(<MovieCard movie={mockMovie} onClick={mockOnClick} />);
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByAltText('Test Movie')).toHaveAttribute(
      'src',
      expect.stringContaining('test-poster.jpg')
    );
  });

  test('calls onClick handler when clicked', () => {
    render(<MovieCard movie={mockMovie} onClick={mockOnClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockMovie);
  });

  test('displays fallback image when poster is not available', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(<MovieCard movie={movieWithoutPoster} onClick={mockOnClick} />);
    
    expect(screen.getByAltText('Test Movie')).toHaveAttribute(
      'src',
      expect.stringContaining('default-poster.jpg')
    );
  });
}); 