import { playerAttack } from '../src/app/components/Utility';
import { ShipProps } from '@/app/types/types';

describe('playerAttack', () => {
  let mockIncrementScore: jest.Mock<any, any, any>;
  let mockSetTurn: jest.Mock<any, any, any>;
  let mockComputerAttack: jest.Mock<any, any, any>;
  let mockCheckShipDestruction: (ships: ShipProps[], board: number[][]) => void;
  let computerBoard: number[][];
  let computerShips: ShipProps[];

  beforeEach(() => {
    mockIncrementScore = jest.fn();
    mockSetTurn = jest.fn();
    mockComputerAttack = jest.fn();
    mockCheckShipDestruction = jest.fn();
    computerBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    computerShips = [
      {
        id: 'ship1',
        length: 3,
        isVertical: true,
        coords: [
          { row: 1, col: 1 },
          { row: 2, col: 1 },
          { row: 3, col: 1 },
        ],
        gameBoardOffset: { top: 0, left: 0 },
        isVisible: true,
        draggable: false,
      },
    ];
  });

  it('should not update the board if cell is not empty', () => {
    computerBoard[0][0] = 2; // Cell already attacked
    const attackCell = { row: 0, col: 0 };
    const newBoard = playerAttack(
      attackCell,
      computerBoard,
      computerShips,
      mockIncrementScore,
      'player',
      mockSetTurn,
      mockComputerAttack,
      mockCheckShipDestruction
    );

    expect(newBoard[0][0]).toBe(2);
    expect(mockIncrementScore).not.toHaveBeenCalled();
    expect(mockSetTurn).not.toHaveBeenCalled();
    expect(mockComputerAttack).not.toHaveBeenCalled();
  });

  it('should call incrementScore and update the board on hit', () => {
    const attackCell = { row: 1, col: 1 };
    const newBoard = playerAttack(
      attackCell,
      computerBoard,
      computerShips,
      mockIncrementScore,
      'player',
      mockSetTurn,
      mockComputerAttack,
      mockCheckShipDestruction
    );

    expect(mockIncrementScore).toHaveBeenCalledWith('player');
    expect(newBoard[1][1]).toBe(1); // 1 indicates a hit
    expect(mockSetTurn).toHaveBeenCalled();
  });

  it('should update the board on miss', () => {
    const attackCell = { row: 0, col: 0 };
    const newBoard = playerAttack(
      attackCell,
      computerBoard,
      computerShips,
      mockIncrementScore,
      'player',
      mockSetTurn,
      mockComputerAttack,
      mockCheckShipDestruction
    );

    expect(newBoard[0][0]).toBe(2); // 2 indicates a miss
    expect(mockSetTurn).toHaveBeenCalled();
  });
});
