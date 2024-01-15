import React from 'react';
import { useGameContext } from '../../../context/GameContext';

const Scoreboard = () => {
  const { playerScore, computerScore, totalLengthOfShips } = useGameContext();

  const scoreboardBoxStyle = {
    backgroundColor: 'black',
    borderRadius: '10px',
    padding: '20px',
    color: 'white',
    fontFamily: 'Patua One',
    marginBottom: '20px',
    minHeight: '190px',
    height: '200px',
  };

  const scoreItemStyle = {
    marginBottom: '5px',
  };

  return (
    <div style={scoreboardBoxStyle}>
      <div style={{ textAlign: 'center' }}>
        <h3>Scoreboard</h3>
        <hr />
        <div style={scoreItemStyle}>Player: {playerScore}</div>
        <div style={scoreItemStyle}>Computer: {computerScore}</div>
        <div style={scoreItemStyle}>Required to Win: {totalLengthOfShips}</div>
      </div>
    </div>
  );
};

export default Scoreboard;
