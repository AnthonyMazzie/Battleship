import React from 'react';
import RestartDialog from './RestartDialog';

const Options = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Patua One',
          textAlign: 'center',
          margin: '15px',
        }}
      >
        <RestartDialog />
      </div>
    </>
  );
};

export default Options;
