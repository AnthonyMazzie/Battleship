// src/types/types.ts

import { Ref } from 'react';

export interface ShipProps {
  id: string;
  length: number;
  isVertical: boolean;
  coords: { row: number; col: number }[];
  gameBoardOffset: { top: number; left: number };
  isVisible: boolean;
  toggleOrientationFunction?: () => void;
  draggable: boolean;
}

export const ItemTypes = {
  SHIP: 'ship',
};

export type GameOverDialogProps = {
  open: boolean;
  onClose: () => void;
  onRestart: () => void;
  gameWinner: string;
};

export enum GameStage {
  Initial, // Just reached the page
  ShipSelection, // Clicked Start
  GameStarted, // Clicked Ready
  FinishedGame, // Game Complete
}

export interface BoardProps {
  board: number[][];
  onCellClick: (rowIndex: number, colIndex: number) => void;
  cellRenderer: (
    cell: number,
    rowIndex: number,
    colIndex: number
  ) => JSX.Element;
  isInteractive: boolean;
  boardRef?: Ref<HTMLDivElement>;
  isReady?: boolean;
  dropRef?: any;
}

export interface ShipDownProps {
  open: boolean;
  onClose: () => void;
  shipName: string;
}

export interface GameContextType {
  playerShips: ShipProps[];
  setPlayerShips: React.Dispatch<React.SetStateAction<ShipProps[]>>;
  computerShips: ShipProps[];
  setComputerShips: React.Dispatch<React.SetStateAction<ShipProps[]>>;
  playerBoard: number[][];
  setPlayerBoard: React.Dispatch<React.SetStateAction<number[][]>>;
  computerBoard: number[][];
  setComputerBoard: React.Dispatch<React.SetStateAction<number[][]>>;
  logShips: () => void;
  placeComputerShips: () => void;
  incrementScore: (playerType: 'player' | 'computer') => void;
  gameStage: GameStage;
  setGameStage: React.Dispatch<React.SetStateAction<GameStage>>;
  playerScore: number;
  computerScore: number;
  totalLengthOfShips: number;
  gameWinner: string;
  checkShipDestruction: (ships: ShipProps[], board: number[][]) => void;
  sunkShips: string[];
  setSunkShips: React.Dispatch<React.SetStateAction<string[]>>;
  setLastNotifiedSunkShip: React.Dispatch<React.SetStateAction<string | null>>;
  lastNotifiedSunkShip: string | null;
}

export const ShipTypes = [
  { id: 'Aircraft Carrier', length: 5 },
  { id: 'Battleship', length: 4 },
  { id: 'Submarine', length: 3 },
  { id: 'Destroyer', length: 3 },
];

export const initialShips: ShipProps[] = [
  {
    id: 'Aircraft Carrier',
    length: 5,
    isVertical: true,
    coords: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 3, col: 0 },
      { row: 4, col: 0 },
    ],
    gameBoardOffset: { top: 0, left: 0 },
    isVisible: false,
    draggable: false,
  },
  {
    id: 'Battleship',
    length: 4,
    isVertical: false,
    coords: [
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 0, col: 4 },
      { row: 0, col: 5 },
    ],
    gameBoardOffset: { top: 0, left: 0 },
    isVisible: false,
    draggable: false,
  },
  {
    id: 'Submarine',
    length: 3,
    isVertical: true,
    coords: [
      { row: 6, col: 6 },
      { row: 7, col: 6 },
      { row: 8, col: 6 },
    ],
    gameBoardOffset: { top: 0, left: 0 },
    isVisible: false,
    draggable: false,
  },
  {
    id: 'Destroyer',
    length: 3,
    isVertical: false,
    coords: [
      { row: 3, col: 7 },
      { row: 3, col: 8 },
      { row: 3, col: 9 },
    ],
    gameBoardOffset: { top: 0, left: 0 },
    isVisible: false,
    draggable: false,
  },
];
