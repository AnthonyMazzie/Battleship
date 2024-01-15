import React from 'react';
import Button from '@mui/material/Button';

type AttackInfoProps = {
  attackCell: { row: number; col: number };
  playerAttack: () => void;
  turn: string;
};

const AttackInfo: React.FC<AttackInfoProps> = ({
  attackCell,
  playerAttack,
  turn,
}) => {
  return (
    <div
      style={{
        padding: '10px',
        margin: '10px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          border: '1px solid black',
          borderRadius: '5px',
          marginRight: '10px',
          paddingTop: '3px',
          paddingBottom: '3px',
          paddingLeft: '9px',
          paddingRight: '9px',
        }}
      >
        <h3>{'[' + attackCell.row + ',' + attackCell.col + ']'}</h3>
      </div>
      <Button
        variant="contained"
        onClick={playerAttack}
        disabled={turn === 'computer'}
        color="success"
      >
        Attack
      </Button>
    </div>
  );
};

export default AttackInfo;
