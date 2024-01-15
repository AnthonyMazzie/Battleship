import React from 'react';
import { useGameContext } from '../../../context/GameContext';
import { GameStage } from '../types/types';

const Instructions = () => {
  const { gameStage } = useGameContext();
  let instructions;
  switch (gameStage) {
    case GameStage.Initial:
      instructions =
        "Discover Battleship: the timeless strategy challenge. Begin your journey by pressing 'Start' – your fleet awaits your command.";
      break;
    case GameStage.ShipSelection:
      instructions =
        'Enter the shipyard. Touch and drag to position your fleet; tap a ship to rotate. Your strategy in placement could turn the tides of war.';
      break;
    case GameStage.GameStarted:
      instructions =
        "Select your target, then strike with 'Attack'. Remember, in this game of strategy, even the smallest move can have a lasting impact.";
      break;
    case GameStage.FinishedGame:
      instructions =
        "The battle concludes. Reflect on the seas conquered and strategies employed. Eager for another challenge? 'Restart' awaits.";
      break;
    default:
      instructions =
        'Embark on a journey of tactical mastery. Each stage of the game is an opportunity to showcase your strategic prowess.';
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '15px',
          width: '45%',
          fontSize: '1.5rem',
          padding: '10px',
          minHeight: '200px',
          fontFamily: 'Patua One',
          textAlign: 'center',
        }}
      >
        <h1 style={{}}>Battleship</h1>
        <br />
        <div style={{ fontSize: '1.1rem' }}>{instructions}</div>
      </div>
    </>
  );
};

export default Instructions;
