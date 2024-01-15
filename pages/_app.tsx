import type { AppProps } from 'next/app';
import '../styles/globals.css';
import GameContextProvider from '../context/GameContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <GameContextProvider>
        <Component {...pageProps} />
      </GameContextProvider>
    </DndProvider>
  );
};

export default MyApp;
