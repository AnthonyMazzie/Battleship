// context/GameContext.tsx
import React, { useState, createContext, useContext, ReactNode } from 'react';
import {
  GameStage,
  ShipProps,
  GameContextType,
  ShipTypes,
  initialShips,
} from '../src/app/types/types';

const GameContext = createContext<GameContextType | undefined>(undefined);

export default function GameContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [playerShips, setPlayerShips] = useState<ShipProps[]>(initialShips);
  const [computerShips, setComputerShips] = useState<ShipProps[]>(initialShips);
  const [gameWinner, setGameWinner] = useState('');
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.Initial);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [sunkShips, setSunkShips] = useState<string[]>([]);
  const [lastNotifiedSunkShip, setLastNotifiedSunkShip] = useState<
    string | null
  >(null);

  const totalLengthOfShips = initialShips.reduce(
    (acc, ship) => acc + ship.length,
    0
  );

  const checkShipDestruction = (ships: ShipProps[], board: number[][]) => {
    ships.forEach((ship) => {
      const isDestroyed = ship.coords.every(
        (coord) => board[coord.row][coord.col] === 1
      );
      if (isDestroyed && !sunkShips.includes(ship.id)) {
        setLastNotifiedSunkShip(ship.id);
        setSunkShips((prevSunkShips) => [...prevSunkShips, ship.id]);
      }
    });
  };

  const incrementScore = (playerType: 'player' | 'computer') => {
    if (playerType === 'player') {
      setPlayerScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore === totalLengthOfShips) {
          setGameWinner('Player');
          setGameStage(GameStage.FinishedGame);
        }
        return newScore;
      });
    } else if (playerType === 'computer') {
      setComputerScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore === totalLengthOfShips) {
          setGameWinner('Computer');
          setGameStage(GameStage.FinishedGame);
        }
        return newScore;
      });
    }
  };

  const [playerBoard, setPlayerBoard] = useState<number[][]>(
    createInitialEmptyBoard()
  );

  const [computerBoard, setComputerBoard] = useState<number[][]>(
    createInitialEmptyBoard()
  );

  const placeComputerShips = () => {
    let newShips: ShipProps[] = [];

    const generateShipPlacement = (length: number) => {
      let isVertical = Math.random() < 0.5;
      let row, col;

      if (isVertical) {
        row = Math.floor(Math.random() * (10 - length));
        col = Math.floor(Math.random() * 10);
      } else {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * (10 - length));
      }

      return { row, col, isVertical };
    };

    const isOverlap = (ship: ShipProps, ships: ShipProps[]) => {
      for (let existingShip of ships) {
        for (let existingCoord of existingShip.coords) {
          if (
            ship.coords.some(
              (coord: { row: number; col: number }) =>
                coord.row === existingCoord.row &&
                coord.col === existingCoord.col
            )
          ) {
            return true;
          }
        }
      }
      return false;
    };

    ShipTypes.forEach((shipType) => {
      let placement, coords, ship;

      do {
        placement = generateShipPlacement(shipType.length);
        coords = [];
        for (let i = 0; i < shipType.length; i++) {
          coords.push(
            placement.isVertical
              ? { row: placement.row + i, col: placement.col }
              : { row: placement.row, col: placement.col + i }
          );
        }
        ship = {
          ...shipType,
          coords,
          isVertical: placement.isVertical,
          isVisible: false,
          gameBoardOffset: { top: 0, left: 0 },
          draggable: false,
        };
      } while (isOverlap(ship, newShips));

      newShips.push(ship);
    });

    setComputerShips(newShips);
  };

  const logShips = () => {
    console.log('Player Ships:', JSON.stringify(playerShips));
    console.log('Computer Ships:', JSON.stringify(computerShips));
  };

  const value = {
    gameWinner, // Value representing winner of game
    playerScore, // Value representing player's current score
    computerScore, // Value representing computer's current score
    gameStage, // Current stage of game
    setGameStage, // Function to set game stage
    playerShips, // Player ship array
    setPlayerShips, // Set player ship array
    computerShips, // Computer ship array
    setComputerShips, // Set computer ship array
    playerBoard, // Player board 2d number array
    setPlayerBoard, // Set player board 2d number array
    computerBoard, // Computer board 2d number array
    setComputerBoard, // Set computer board 2d number array
    logShips, // Function to log player and computer ship positions (for development)
    placeComputerShips, // Function that selects ship locations for the computer
    incrementScore, // Increment score and check for win
    totalLengthOfShips, // Value representing total length of ships for a player
    checkShipDestruction, // Function to check if a ship is destroyed
    sunkShips, // Value representing the ships that have been sunk
    setSunkShips, // Function allowing modifications to the sunkShips array
    lastNotifiedSunkShip, // Value representing last ship sunk
    setLastNotifiedSunkShip, // Function allowing modifications to the lastNotifiedSunkShip
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameContextProvider');
  }
  return context;
}

function createInitialEmptyBoard() {
  const initialBoard = new Array(10)
    .fill(null)
    .map(() => new Array(10).fill(0));
  return initialBoard;
}
