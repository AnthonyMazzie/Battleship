import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Instructions from '../src/app/components/Instructions';
import { GameStage } from '../src/app/types/types';

jest.mock('../context/GameContext', () => ({
  useGameContext: jest.fn(),
}));

const mockedUseGameContext = require('../context/GameContext').useGameContext;

describe('Instructions', () => {
  it('displays initial instructions', () => {
    // Mock the context value for initial stage
    mockedUseGameContext.mockImplementation(() => ({
      gameStage: GameStage.Initial,
    }));

    const { getByText } = render(<Instructions />);
    expect(
      getByText(
        "Discover Battleship: the timeless strategy challenge. Begin your journey by pressing 'Start' – your fleet awaits your command."
      )
    ).toBeInTheDocument();
  });

  it('displays ship selection instructions', () => {
    mockedUseGameContext.mockImplementation(() => ({
      gameStage: GameStage.ShipSelection,
    }));

    const { getByText } = render(<Instructions />);
    expect(
      getByText(
        'Enter the shipyard. Touch and drag to position your fleet; tap a ship to rotate. Your strategy in placement could turn the tides of war.'
      )
    ).toBeInTheDocument();
  });

  it('displays game started instructions', () => {
    mockedUseGameContext.mockImplementation(() => ({
      gameStage: GameStage.GameStarted,
    }));

    const { getByText } = render(<Instructions />);
    expect(
      getByText(
        "Select your target, then strike with 'Attack'. Remember, in this game of strategy, even the smallest move can have a lasting impact."
      )
    ).toBeInTheDocument();
  });

  it('displays finished game instructions', () => {
    mockedUseGameContext.mockImplementation(() => ({
      gameStage: GameStage.FinishedGame,
    }));

    const { getByText } = render(<Instructions />);
    expect(
      getByText(
        "The battle concludes. Reflect on the seas conquered and strategies employed. Eager for another challenge? 'Restart' awaits."
      )
    ).toBeInTheDocument();
  });
});
