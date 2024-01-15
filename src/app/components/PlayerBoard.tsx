import React, { forwardRef } from 'react';
import { getCellColor } from '../components/Utility';

type PlayerBoardProps = {
  board: number[][];
  ready: boolean;
  boardRef: React.RefObject<HTMLDivElement>;
  setDropRef: (element: HTMLDivElement | null) => void; // New prop to set the drop ref
  isPlayerBoard: boolean;
};

const PlayerBoard = forwardRef<HTMLDivElement, PlayerBoardProps>(
  ({ board, ready, boardRef, setDropRef, isPlayerBoard }, ref) => {
    let actualRef = ready
      ? (el: HTMLDivElement | null) => setDropRef(el)
      : boardRef;

    return (
      <div
        ref={actualRef}
        style={{
          backgroundColor: 'black',
          margin: '1px',
          padding: '1px',
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 30px)',
          gridTemplateRows: 'repeat(10, 30px)',
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell: number, colIndex: number) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: '30px',
                height: '30px',
                border:
                  cell === 1 ? '1px solid black' : '1px solid transparent',
                backgroundColor: getCellColor(cell),
                borderRadius: '3px',
              }}
            />
          ))
        )}
      </div>
    );
  }
);

PlayerBoard.displayName = 'PlayerBoard';

export default PlayerBoard;
