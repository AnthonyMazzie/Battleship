import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useGameContext } from '../../../context/GameContext';
import { useDrop } from 'react-dnd';
import { ShipProps, ItemTypes, GameStage } from '../types/types';
import {
  isCellEmpty,
  isPositionValid,
  isOverlap,
  getNewFootprint,
  toggleShipOrientation,
  playerAttack,
} from './Utility';
import AttackInfo from './AttackInfo';
import ComputerArea from './ComputerArea';
import PlayerArea from './PlayerArea';
import Button from '@mui/material/Button';
import Legend from './Legend';
import GameOverDialog from './GameOver';
import Scoreboard from './Scoreboard';
import ShipDown from './ShipDown';

const Game: React.FC = () => {
  const {
    playerShips,
    computerShips,
    logShips,
    setPlayerShips,
    setComputerBoard,
    placeComputerShips,
    incrementScore,
    playerBoard,
    computerBoard,
    gameStage,
    setGameStage,
    gameWinner,
    checkShipDestruction,
    sunkShips,
    setLastNotifiedSunkShip,
    lastNotifiedSunkShip,
  } = useGameContext();
  const playerBoardRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameBoardOffset, setGameBoardOffset] = useState({ top: 0, left: 0 });
  const [areShipsVisible, setAreShipsVisible] = useState(false);
  const [attackCell, setAttackCell] = useState({ row: 1, col: 1 });
  const [turn, setTurn] = useState('player');

  const [showGameOverDialog, setShowGameOverDialog] = useState(false);

  useEffect(() => {
    if (gameStage === GameStage.FinishedGame) {
      setShowGameOverDialog(true);
    } else {
      setShowGameOverDialog(false);
    }
  }, [gameStage]);

  const playerAttackHandler = () => {
    const newComputerBoard = playerAttack(
      attackCell,
      computerBoard,
      computerShips,
      incrementScore,
      turn,
      setTurn,
      computerAttack,
      checkShipDestruction
    );

    setComputerBoard(newComputerBoard);
  };

  const handleCloseShipDown = () => {
    setLastNotifiedSunkShip(null);
  };

  const computerAttack = () => {
    const randomRow = Math.floor(Math.random() * 10);
    const randomCol = Math.floor(Math.random() * 10);

    handleComputerCellClick(randomRow, randomCol);

    const isEmpty = isCellEmpty(randomRow, randomCol, playerBoard);

    if (isEmpty) {
      const isHit = playerShips.some((ship) =>
        ship.coords.some(
          (coord) => coord.row === randomRow && coord.col === randomCol
        )
      );

      if (isHit) {
        // console.log(`Computer hit @ [${randomRow}, ${randomCol}]!`);
        incrementScore('computer');
        const newPlayerBoard = [...playerBoard];
        newPlayerBoard[randomRow][randomCol] = 1;
      } else {
        // console.log(`Computer miss @ [${randomRow}, ${randomCol}]!`);
        const newPlayerBoard = [...playerBoard];
        newPlayerBoard[randomRow][randomCol] = 2;
      }
    }
  };

  const initializeGame = () => {
    setGameBoardOffset(getGameBoardOffset());
    placeComputerShips();
    setGameStage(GameStage.ShipSelection);
    setReady(true);
    setAreShipsVisible(true);
  };

  const startGame = () => {
    setGameStage(GameStage.GameStarted);
    placeComputerShips();
    setGameStarted(true);
  };

  const logShipsHandler = () => {
    logShips();
  };

  const [, drop] = useDrop({
    accept: ItemTypes.SHIP,
    drop: (item: ShipProps, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        let newCol = Math.round(delta.x / 30) + item.coords[0].col;
        let newRow = Math.round(delta.y / 30) + item.coords[0].row;

        const newFootprint = getNewFootprint(
          item,
          newRow,
          newCol,
          item.isVertical
        );

        const overlap = isOverlap(newFootprint, item.id, playerShips);

        if (isPositionValid(newFootprint) && !overlap) {
          moveShip(item.id, newRow, newCol);
        }
      }
    },
  });

  const moveShip = useCallback(
    (id: string, newRow: number, newCol: number) => {
      setPlayerShips((currentShips) => {
        return currentShips.map((ship) => {
          if (ship.id === id) {
            const newCoords = ship.coords.map((coord, index) => {
              return ship.isVertical
                ? { row: newRow + index, col: newCol }
                : { row: newRow, col: newCol + index };
            });
            return { ...ship, coords: newCoords };
          }
          return ship;
        });
      });
    },
    [setPlayerShips]
  );

  const handleToggleShipOrientation = (shipId: string) => {
    toggleShipOrientation(shipId, playerShips, gameStarted, setPlayerShips);
  };

  const getGameBoardOffset = () => {
    if (playerBoardRef.current) {
      const rect = playerBoardRef.current.getBoundingClientRect();
      return { top: rect.top, left: rect.left };
    }
    return { top: 0, left: 0 };
  };

  const handleComputerCellClick = (row: number, col: number) => {
    if (gameStarted) {
      setAttackCell({ row, col });
    }
  };

  const renderGameStageComponents = () => {
    switch (gameStage) {
      case GameStage.Initial:
        return (
          <div style={{ padding: '10px', margin: '10px' }}>
            <Button
              variant="contained"
              onClick={initializeGame}
              style={{ fontFamily: 'Patua One' }}
            >
              Start
            </Button>
          </div>
        );

      case GameStage.ShipSelection:
        return (
          <div style={{ padding: '10px', margin: '10px' }}>
            <Button
              variant="contained"
              onClick={startGame}
              style={{ fontFamily: 'Patua One' }}
            >
              Ready
            </Button>
          </div>
        );

      case GameStage.GameStarted:
        return (
          <AttackInfo
            attackCell={attackCell}
            playerAttack={playerAttackHandler}
            turn={turn}
          />
        );

      case GameStage.FinishedGame:
        return (
          <AttackInfo
            attackCell={attackCell}
            playerAttack={playerAttackHandler}
            turn={turn}
          />
        );
    }
  };

  const renderScoreBoard = () => {
    switch (gameStage) {
      case GameStage.GameStarted:
        return <Scoreboard />;
    }
  };

  const renderLegend = () => {
    switch (gameStage) {
      case GameStage.GameStarted:
        return <Legend />;
    }
  };

  if (!playerBoard || !computerBoard || !playerShips) {
    return <div>Loading...</div>;
  }

  const lastSunkShip = sunkShips[sunkShips.length - 1];

  return (
    <>
      {lastNotifiedSunkShip && (
        <ShipDown
          open={true}
          shipName={lastNotifiedSunkShip}
          onClose={handleCloseShipDown}
        />
      )}
      {/* <button onClick={logShipsHandler}></button> */}
      {renderGameStageComponents()}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'black',
          padding: '25px',
          borderRadius: '15px',
        }}
      >
        <PlayerArea
          playerShips={playerShips}
          playerBoard={playerBoard}
          ready={ready}
          boardRef={playerBoardRef}
          setDropRef={drop}
          gameBoardOffset={gameBoardOffset}
          areShipsVisible={areShipsVisible}
          toggleShipOrientation={handleToggleShipOrientation}
          gameStarted={gameStarted}
        />
        <ComputerArea
          board={computerBoard}
          handleCellClick={handleComputerCellClick}
          attackCell={attackCell}
          gameStarted={gameStarted}
        />
      </div>
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '25px',
        }}
      >
        {renderLegend()}
        {renderScoreBoard()}
      </div>
      <GameOverDialog
        gameWinner={gameWinner}
        open={showGameOverDialog}
        onClose={() => setShowGameOverDialog(false)}
        onRestart={() => window.location.reload()}
      />
    </>
  );
};

export default Game;
