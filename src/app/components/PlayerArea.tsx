import React from 'react';
import Ship from './Ship';
import PlayerBoard from './PlayerBoard';
import { ShipProps } from '../types/types';

type PlayerAreaProps = {
  playerShips: ShipProps[];
  playerBoard: number[][];
  ready: boolean;
  boardRef: React.RefObject<HTMLDivElement>;
  setDropRef: (element: HTMLDivElement | null) => void;
  gameBoardOffset: { top: number; left: number };
  areShipsVisible: boolean;
  toggleShipOrientation: (shipId: string) => void;
  gameStarted: boolean;
};

const PlayerArea: React.FC<PlayerAreaProps> = ({
  playerShips,
  playerBoard,
  ready,
  boardRef,
  setDropRef,
  gameBoardOffset,
  areShipsVisible,
  toggleShipOrientation,
  gameStarted,
}) => {
  return (
    <div
      style={{
        marginRight: '15px',
        textAlign: 'center',
        color: 'white',
        borderRadius: '15px',
        fontFamily: 'Patua One',
      }}
    >
      <h2>Player</h2>
      <PlayerBoard
        board={playerBoard}
        ready={ready}
        boardRef={boardRef}
        setDropRef={setDropRef}
        isPlayerBoard={true}
      />
      {playerShips.map((ship) => (
        <Ship
          key={ship.id}
          id={ship.id}
          length={ship.length}
          isVertical={ship.isVertical}
          coords={ship.coords}
          gameBoardOffset={gameBoardOffset}
          isVisible={areShipsVisible}
          toggleOrientationFunction={() => toggleShipOrientation(ship.id)}
          draggable={gameStarted}
        />
      ))}
    </div>
  );
};

export default PlayerArea;
