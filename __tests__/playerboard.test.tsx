import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerBoard from '../src/app/components/PlayerBoard';

jest.mock('../src/app/components/Utility', () => ({
  getCellColor: jest.fn((cell) => (cell === 1 ? 'red' : 'blue')),
}));

describe('PlayerBoard Component', () => {
  it('renders the board correctly', () => {
    const mockBoard = Array(10).fill(Array(10).fill(0));
    mockBoard[0][0] = 1; // Simulate a hit

    const { container } = render(
      <PlayerBoard
        board={mockBoard}
        ready={false}
        boardRef={{ current: null }}
        setDropRef={() => {}}
        isPlayerBoard={true}
      />
    );

    const cells = container.querySelectorAll('div > div > div');
    expect(cells.length).toBe(100); // 10x10 grid
    expect(cells[0]).toHaveStyle('backgroundColor: red'); // First cell should be red (hit)
    expect(cells[1]).toHaveStyle('backgroundColor: blue'); // Other cells blue
  });

  it('renders the correct number of cells', () => {
    const mockBoard = Array(8).fill(Array(8).fill(0));

    const { container } = render(
      <PlayerBoard
        board={mockBoard}
        ready={false}
        boardRef={{ current: null }}
        setDropRef={() => {}}
        isPlayerBoard={true}
      />
    );

    const cells = container.querySelectorAll('div > div > div');
    expect(cells.length).toBe(64); // 8x8 grid
  });

  it('renders cells with correct colors based on board values', () => {
    const mockBoard = [
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
    ];

    const { container } = render(
      <PlayerBoard
        board={mockBoard}
        ready={false}
        boardRef={{ current: null }}
        setDropRef={() => {}}
        isPlayerBoard={true}
      />
    );

    const cells = container.querySelectorAll('div > div > div');

    expect(cells[0]).toHaveStyle('backgroundColor: blue'); // Check first cell
    expect(cells[1]).toHaveStyle('backgroundColor: red'); // Check second cell
    // ... Continue checking the colors for other cells
  });

  it('sets the correct ref based on the ready prop', () => {
    const mockBoard = Array(10).fill(Array(10).fill(0));
    const setDropRefMock = jest.fn();

    render(
      <PlayerBoard
        board={mockBoard}
        ready={true} // Ready is true, so it should use setDropRef
        boardRef={{ current: null }}
        setDropRef={setDropRefMock}
        isPlayerBoard={true}
      />
    );

    expect(setDropRefMock).toHaveBeenCalledTimes(1); // setDropRef should be called
  });

  it('sets the correct ref based on the ready prop', () => {
    const mockBoard = Array(10).fill(Array(10).fill(0));
    const boardRefMock = { current: null };

    render(
      <PlayerBoard
        board={mockBoard}
        ready={false} // Ready is false, so it should use boardRef
        boardRef={boardRefMock}
        setDropRef={() => {}}
        isPlayerBoard={true}
      />
    );

    expect(boardRefMock.current).toBeTruthy(); // boardRef should not be null
  });
});
