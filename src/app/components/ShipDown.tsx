import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ShipDownProps } from '../types/types';

const ShipDown: React.FC<ShipDownProps> = ({ open, onClose, shipName }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title" style={{ fontFamily: 'Patua One' }}>
          Direct Hit!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="dialog-description"
            style={{ fontFamily: 'Patua One' }}
          >
            {`Brilliant – you've sunk the enemy's ${shipName}!`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            autoFocus
            style={{
              color: '#007aff',
              fontWeight: 'bold',
              fontFamily: 'Patua One',
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ShipDown;
