import React from 'react';
import Game from '../src/app/components/Game';
import Instructions from '@/app/components/Instructions';
import Options from '@/app/components/Options';
import { useGameContext } from '../context/GameContext';
import { GameStage } from '@/app/types/types';

const HomePage = () => {
  const { gameStage } = useGameContext();

  const renderOptions = () => {
    if (gameStage == GameStage.GameStarted) {
      return <Options />;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Instructions />
      <Game />
      {renderOptions()}
    </div>
  );
};

export default HomePage;
