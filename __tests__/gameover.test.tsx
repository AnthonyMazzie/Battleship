import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameOverDialog from '../src/app/components/GameOver';

describe('GameOverDialog', () => {
  it('renders the victory message for the Player correctly', () => {
    const { getByText } = render(
      <GameOverDialog
        gameWinner="Player"
        open={true}
        onClose={() => {}}
        onRestart={() => {}}
      />
    );
    expect(
      getByText(/you've emerged not just a player, but a maestro/i)
    ).toBeInTheDocument();
  });

  it('renders the victory message for the Computer correctly', () => {
    const { getByText } = render(
      <GameOverDialog
        gameWinner="Computer"
        open={true}
        onClose={() => {}}
        onRestart={() => {}}
      />
    );
    expect(
      getByText(/Today, the digital mind has carved its victory/i)
    ).toBeInTheDocument();
  });

  it('does not render victory message when gameWinner is not defined', () => {
    render(
      <GameOverDialog
        open={true}
        onClose={() => {}}
        onRestart={() => {}}
        gameWinner=""
      />
    );
    expect(
      screen.queryByText(/you've emerged not just a player, but a maestro/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Today, the digital mind has carved its victory/i)
    ).not.toBeInTheDocument();
  });

  it('renders the dialog title correctly', () => {
    const { getByText } = render(
      <GameOverDialog
        gameWinner="Player"
        open={true}
        onClose={() => {}}
        onRestart={() => {}}
      />
    );
    expect(getByText('Epic Journey, Unfinished Saga')).toBeInTheDocument();
  });

  it('closes the dialog when onClose function is triggered', () => {
    const mockOnClose = jest.fn();
    const { getByText } = render(
      <GameOverDialog
        gameWinner="Player"
        open={true}
        onClose={mockOnClose}
        onRestart={() => {}}
      />
    );

    fireEvent.click(getByText('Close'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('renders Close and Restart buttons correctly', () => {
    const { getByText } = render(
      <GameOverDialog
        gameWinner="Player"
        open={true}
        onClose={() => {}}
        onRestart={() => {}}
      />
    );

    expect(getByText('Close')).toBeInTheDocument();
    expect(getByText('Restart')).toBeInTheDocument();
  });
});
