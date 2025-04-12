import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';

const mockMovie = {
  Title: 'Test Movie',
  Year: '2024',
  Rated: 'PG-13',
  Runtime: '120 min',
  Genre: 'Action, Drama',
  Director: 'Test Director',
  Plot: 'Test movie plot',
  Poster: 'test-poster.jpg',
  imdbRating: '8.5',
};

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('renders modal with movie details', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        movieDetails={mockMovie}
      />
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Test Director')).toBeInTheDocument();
    expect(screen.getByText('Test movie plot')).toBeInTheDocument();
    expect(screen.getByText('120 min')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        movieDetails={mockMovie}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not render when isOpen is false', () => {
    render(
      <Modal
        isOpen={false}
        onClose={mockOnClose}
        movieDetails={mockMovie}
      />
    );

    expect(screen.queryByText('Test Movie')).not.toBeInTheDocument();
  });
}); 