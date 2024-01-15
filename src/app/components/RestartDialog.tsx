import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const RestartDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEngage = () => {
    window.location.reload(); // Reloads the current page
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ fontWeight: 'bold', fontFamily: 'Patua One' }}
        size="small"
      >
        Restart Battle
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title" style={{ fontFamily: 'Patua One' }}>
          {'New Battle Awaits'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="dialog-description"
            style={{ fontFamily: 'Patua One' }}
          >
            Are you ready to chart a new course in this naval conquest?
            Restarting the game is not just a reset, it’s a new opportunity to
            strategize, outmaneuver, and emerge victorious. Embrace the
            challenge and prepare to set sail into uncharted waters. Do you have
            what it takes to win the battle anew?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ color: '#007aff', fontFamily: 'Patua One' }}
          >
            Retreat
          </Button>
          <Button
            onClick={handleEngage}
            autoFocus
            style={{
              color: '#007aff',
              fontWeight: 'bold',
              fontFamily: 'Patua One',
            }}
          >
            Engage
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default RestartDialog;
