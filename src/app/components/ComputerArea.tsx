import React from 'react';
import { getCellColor } from '../components/Utility';

type ComputerAreaProps = {
  board: number[][];
  handleCellClick: (row: number, col: number) => void;
  attackCell: { row: number; col: number };
  gameStarted: boolean;
};

const ComputerArea: React.FC<ComputerAreaProps> = ({
  board,
  handleCellClick,
  attackCell,
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
      <h2>Computer</h2>
      <div
        style={{
          backgroundColor: 'white',
          margin: '1px',
          padding: '1px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 30px)',
            gridTemplateRows: 'repeat(10, 30px)',
            backgroundColor: 'black',
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell: number, colIndex: number) => {
              const isSelected =
                gameStarted &&
                attackCell.row === rowIndex &&
                attackCell.col === colIndex;
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  style={{
                    width: '30px',
                    height: '30px',
                    border: isSelected
                      ? '5px solid orange'
                      : '1px solid transparent',
                    backgroundColor: getCellColor(cell),
                    borderRadius: isSelected ? '8px' : '3px',
                  }}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ComputerArea;
