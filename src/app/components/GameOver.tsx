import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { GameOverDialogProps } from '../types/types';

const renderVictoryMessage = (gameWinner: string) => {
  if (gameWinner === 'Player') {
    return (
      <div style={{ padding: '10px', margin: '10px', fontFamily: 'Patua One' }}>
        In the grand theater of strategy and wit, you&apos;ve emerged not just a
        player, but a maestro.
        <br />
        <br />
        Your journey through these tactical seas has been a symphony of
        intellect and foresight. As we celebrate your well-earned victory,
        remember, the gameboard is an ever-evolving world, ripe with endless
        possibilities. Each play is a brushstroke on the vast canvas of
        strategy.
        <br />
        <br />
        So, as we applaud your triumph today, the horizon whispers of untold
        adventures. Are you ready to answer the call once more, to dive into the
        depths of challenge and emerge, yet again, victorious?
      </div>
    );
  } else if (gameWinner === 'Computer') {
    return (
      <div style={{ padding: '10px', margin: '10px', fontFamily: 'Patua One' }}>
        Today, the digital mind has carved its victory in the annals of our
        game, a reminder of the endless dance between human ingenuity and the
        marvels of technology.
        <br />
        <br />
        As you stand at this crossroad of reflection and anticipation, take a
        moment to savor the journey that brought you here. Every challenge
        faced, every strategy deployed, has been a step towards greatness.
        <br />
        <br />
        Now, the game beckons you back to its realm of endless possibilities.
        Will you rise to the challenge once more, blending your skill and
        experience to chart a new course to victory? The next chapter awaits,
        ready to be written by your hand.
      </div>
    );
  }
};

const GameOverDialog: React.FC<GameOverDialogProps> = ({
  open,
  onClose,
  onRestart,
  gameWinner,
}) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title" style={{ fontFamily: 'Patua One' }}>
          Epic Journey, Unfinished Saga
        </DialogTitle>
        <DialogContent>{renderVictoryMessage(gameWinner)}</DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            style={{ color: '#007aff', fontFamily: 'Patua One' }}
          >
            Close
          </Button>
          <Button
            onClick={onRestart}
            autoFocus
            style={{
              color: '#007aff',
              fontWeight: 'bold',
              fontFamily: 'Patua One',
            }}
          >
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default GameOverDialog;
