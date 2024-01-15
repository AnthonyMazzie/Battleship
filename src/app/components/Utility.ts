import { ShipProps } from '../types/types';

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const playerAttack = (
  attackCell: { row: number; col: number },
  computerBoard: number[][],
  computerShips: ShipProps[],
  incrementScore: (playerType: 'player' | 'computer') => void,
  turn: string,
  setTurn: React.Dispatch<React.SetStateAction<string>>,
  computerAttack: () => void,
  checkShipDestruction: (ships: ShipProps[], board: number[][]) => void
) => {
  const { row, col } = attackCell;

  const isEmpty = isCellEmpty(row, col, computerBoard);

  if (isEmpty) {
    const isHit = computerShips.some((ship) =>
      ship.coords.some((coord) => coord.row === row && coord.col === col)
    );

    let newComputerBoard;

    if (isHit) {
      // console.log(`Player hit  @ [${row}, ${col}]!`);
      incrementScore('player');
      newComputerBoard = [...computerBoard];
      newComputerBoard[row][col] = 1;
      checkShipDestruction(computerShips, newComputerBoard);
    } else {
      // console.log(`Player miss  @ [${row}, ${col}]!`);
      newComputerBoard = [...computerBoard];
      newComputerBoard[row][col] = 2;
    }
    toggleTurn(turn, setTurn, computerAttack);
    return newComputerBoard;
  }
  return computerBoard;
};

export const getNewFootprint = (
  ship: ShipProps,
  newRow: number,
  newCol: number,
  isVertical: boolean // Use this parameter for determining orientation
) => {
  const newCoords = [];

  for (let i = 0; i < ship.length; i++) {
    if (isVertical) {
      // Use the passed 'isVertical' parameter
      newCoords.push({ row: newRow + i, col: newCol });
    } else {
      newCoords.push({ row: newRow, col: newCol + i });
    }
  }

  return newCoords;
};

export const isPositionValid = (coords: { row: number; col: number }[]) => {
  for (const coord of coords) {
    if (coord.row < 0 || coord.row >= 10 || coord.col < 0 || coord.col >= 10) {
      return false; // Segment of the ship is out of bounds
    }
  }
  return true; // All segments are within bounds
};

export const isOverlap = (
  newFootprint: any[],
  shipId: string,
  playerShips: ShipProps[]
) => {
  for (const ship of playerShips) {
    if (ship.id !== shipId) {
      for (const coord of ship.coords) {
        if (
          newFootprint.some(
            (newCoord) =>
              newCoord.row === coord.row && newCoord.col === coord.col
          )
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export const toggleTurn = async (
  currentTurn: string,
  setTurn: React.Dispatch<React.SetStateAction<string>>,
  computerAttack: () => void
) => {
  if (currentTurn === 'player') {
    setTurn('computer');
    // Simulating computer turn ...
    await sleep(1500);
    computerAttack();
    setTurn('player');
  } else {
    setTurn('player');
  }
};

export const isCellEmpty = (row: number, col: number, board: number[][]) => {
  let isEmpty = board[row][col] !== 1 && board[row][col] !== 2;
  return isEmpty;
};

export const toggleShipOrientation = (
  shipId: string,
  playerShips: ShipProps[],
  gameStarted: boolean,
  setPlayerShips: React.Dispatch<React.SetStateAction<ShipProps[]>>
) => {
  if (!gameStarted) {
    setPlayerShips((currentShips) => {
      return currentShips.map((ship) => {
        if (ship.id === shipId) {
          const newOrientation = !ship.isVertical;
          const newCoords = getNewFootprint(
            ship,
            ship.coords[0].row,
            ship.coords[0].col,
            newOrientation
          );

          if (
            isPositionValid(newCoords) &&
            !isOverlap(newCoords, shipId, playerShips)
          ) {
            return { ...ship, isVertical: newOrientation, coords: newCoords };
          }
        }
        return ship;
      });
    });
  }
};

export const getRandomRowCol = () => ({
  row: Math.floor(Math.random() * 10),
  col: Math.floor(Math.random() * 10),
});

export function getCellColor(cellValue: number): string {
  switch (cellValue) {
    case 1:
      return 'red'; // Hit
    case 2:
      return 'blue'; // Miss
    default:
      return 'white'; // Empty
  }
}
