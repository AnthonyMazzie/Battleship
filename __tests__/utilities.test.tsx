import { ShipProps } from '@/app/types/types';
import {
  isCellEmpty,
  getNewFootprint,
  isPositionValid,
  isOverlap,
  toggleShipOrientation,
  toggleTurn,
  getRandomRowCol,
  getCellColor,
} from '../src/app/components/Utility';

describe('isCellEmpty', () => {
  it('returns true for an empty cell', () => {
    const board = Array(10).fill(Array(10).fill(0));
    const row = 5;
    const col = 5;
    expect(isCellEmpty(row, col, board)).toBe(true);
  });

  it('returns false for a cell with a hit', () => {
    const board = Array(10).fill(Array(10).fill(0));
    board[3][3] = 1; // Simulate a hit
    const row = 3;
    const col = 3;
    expect(isCellEmpty(row, col, board)).toBe(false);
  });

  it('returns false for a cell with a miss', () => {
    const board = Array(10).fill(Array(10).fill(0));
    board[4][4] = 2; // Simulate a miss
    const row = 4;
    const col = 4;
    expect(isCellEmpty(row, col, board)).toBe(false);
  });
});

describe('getNewFootprint', () => {
  const testShip: ShipProps = {
    id: 'testShip',
    length: 3,
    coords: [],
    isVertical: false,
    isVisible: true,
    gameBoardOffset: { top: 0, left: 0 },
    draggable: true,
  };

  it('creates horizontal footprint correctly', () => {
    const footprint = getNewFootprint(testShip, 0, 0, false);
    expect(footprint).toEqual([
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ]);
  });

  it('creates vertical footprint correctly', () => {
    const footprint = getNewFootprint(testShip, 0, 0, true);
    expect(footprint).toEqual([
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
    ]);
  });
});

describe('isPositionValid', () => {
  it('returns true for valid positions', () => {
    const coords = [
      { row: 0, col: 0 },
      { row: 1, col: 1 },
    ];
    expect(isPositionValid(coords)).toBe(true);
  });

  it('returns false for out-of-bounds positions', () => {
    const coords = [
      { row: -1, col: 0 },
      { row: 10, col: 10 },
    ];
    expect(isPositionValid(coords)).toBe(false);
  });
});

describe('isOverlap', () => {
  const existingShips: ShipProps[] = [
    {
      id: 'ship1',
      length: 3,
      coords: [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
      ],
      isVertical: true,
      isVisible: true,
      gameBoardOffset: { top: 0, left: 0 },
      draggable: true,
    },
  ];

  it('returns true when new ship overlaps', () => {
    const newFootprint = [
      { row: 1, col: 0 },
      { row: 2, col: 0 },
    ];
    expect(isOverlap(newFootprint, 'ship2', existingShips)).toBe(true);
  });

  it('returns false when new ship does not overlap', () => {
    const newFootprint = [
      { row: 3, col: 0 },
      { row: 4, col: 0 },
    ];
    expect(isOverlap(newFootprint, 'ship2', existingShips)).toBe(false);
  });
});

describe('toggleShipOrientation', () => {
  it('toggles the orientation of a ship', () => {
    const mockSetPlayerShips = jest.fn();
    const ship: ShipProps = {
      id: 'ship1',
      length: 3,
      coords: [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
      ],
      isVertical: false,
      isVisible: true,
      gameBoardOffset: { top: 0, left: 0 },
      draggable: true,
    };
    const playerShips = [ship];

    toggleShipOrientation('ship1', playerShips, false, mockSetPlayerShips);

    expect(mockSetPlayerShips).toHaveBeenCalledWith(expect.any(Function));
    const newState = mockSetPlayerShips.mock.calls[0][0](playerShips);
    expect(newState[0].isVertical).toBe(true);
    expect(newState[0].coords).toEqual(
      getNewFootprint(ship, ship.coords[0].row, ship.coords[0].col, true)
    );
  });
});

jest.mock('../src/app/components/Utility', () => ({
  ...jest.requireActual('../src/app/components/Utility'),
  sleep: jest.fn().mockResolvedValue(undefined),
}));

describe('toggleTurn', () => {
  it('toggles turn from player to computer and back', async () => {
    const mockSetTurn = jest.fn();
    const mockComputerAttack = jest.fn();

    await toggleTurn('player', mockSetTurn, mockComputerAttack);
    expect(mockSetTurn).toHaveBeenNthCalledWith(1, 'computer');
    expect(mockSetTurn).toHaveBeenNthCalledWith(2, 'player');
    expect(mockComputerAttack).toHaveBeenCalled();
  });
});

describe('getRandomRowCol', () => {
  it('generates a random row and column within the board', () => {
    const { row, col } = getRandomRowCol();
    expect(row).toBeGreaterThanOrEqual(0);
    expect(row).toBeLessThan(10);
    expect(col).toBeGreaterThanOrEqual(0);
    expect(col).toBeLessThan(10);
  });
});

describe('toggleShipOrientation', () => {
  it('does not toggle orientation if the game has started', () => {
    const mockSetPlayerShips = jest.fn();
    const ship: ShipProps = {
      id: 'ship1',
      length: 3,
      coords: [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
      ],
      isVertical: false,
      isVisible: true,
      gameBoardOffset: { top: 0, left: 0 },
      draggable: true,
    };
    const playerShips = [ship];

    toggleShipOrientation('ship1', playerShips, true, mockSetPlayerShips);

    expect(mockSetPlayerShips).not.toHaveBeenCalled();
  });
});

describe('toggleTurn', () => {
  it('does not simulate computer turn if it is not the player turn', async () => {
    const mockSetTurn = jest.fn();
    const mockComputerAttack = jest.fn();

    await toggleTurn('computer', mockSetTurn, mockComputerAttack);
    expect(mockSetTurn).toHaveBeenCalledTimes(1); // Turn should not change
    expect(mockComputerAttack).not.toHaveBeenCalled(); // Computer should not attack
  });
});

describe('getCellColor Function', () => {
  it('returns red for a hit (cellValue = 1)', () => {
    expect(getCellColor(1)).toBe('red');
  });

  it('returns blue for a miss (cellValue = 2)', () => {
    expect(getCellColor(2)).toBe('blue');
  });

  it('returns white for an empty cell (cellValue = 0)', () => {
    expect(getCellColor(0)).toBe('white');
  });

  it('returns white for a negative cellValue', () => {
    expect(getCellColor(-1)).toBe('white');
  });

  it('returns white for a cellValue greater than 2', () => {
    expect(getCellColor(3)).toBe('white');
  });

  it('returns white for a non-numeric cellValue', () => {
    // Assuming non-numeric inputs are coerced to 0 or handled as default
    expect(getCellColor('invalid' as unknown as number)).toBe('white');
  });
});
