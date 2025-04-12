import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Integration', () => {
  test('loads and displays trending movies', async () => {
    render(<App />);
    
    // Check loading state
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    
    // Wait for movies to load
    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
    });
    
    // Verify movie cards are rendered with correct information
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('7.5')).toBeInTheDocument();
  });

  test('opens modal with movie details when clicking a movie', async () => {
    render(<App />);
    
    // Wait for movies to load and click the first movie
    await waitFor(() => {
      const movieCards = screen.getAllByTestId('movie-card');
      userEvent.click(movieCards[0]);
    });
    
    // Verify modal content
    await waitFor(() => {
      expect(screen.getByText('Test Director')).toBeInTheDocument();
      expect(screen.getByText('Test movie plot')).toBeInTheDocument();
      expect(screen.getByText('120 min')).toBeInTheDocument();
    });
  });

  test('toggles between light and dark theme', async () => {
    render(<App />);
    
    const themeToggle = screen.getByTestId('theme-toggle');
    const app = screen.getByTestId('app');
    
    // Initial theme should be light
    expect(app).toHaveClass('light-theme');
    
    // Click theme toggle
    userEvent.click(themeToggle);
    expect(app).toHaveClass('dark-theme');
    
    // Click again to switch back to light
    userEvent.click(themeToggle);
    expect(app).toHaveClass('light-theme');
  });

  test('switches between different movie count options', async () => {
    render(<App />);
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    });
    
    // Click on "Top 25 Monthly" button
    const monthlyButton = screen.getByRole('button', { name: /top 25 monthly/i });
    userEvent.click(monthlyButton);
    
    // Wait for monthly movies to load
    await waitFor(() => {
      expect(screen.getByText('Monthly Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Monthly Movie 2')).toBeInTheDocument();
    });
  });
}); 