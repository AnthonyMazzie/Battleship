import React from 'react';

const Legend: React.FC = () => {
  const circleStyle = (color: string) => ({
    width: '25px',
    height: '25px',
    backgroundColor: color,
    marginRight: '10px',
  });

  const listItemStyle = {
    display: 'flex', // Uses flexbox for alignment
    alignItems: 'center', // Aligns items vertically in the center
    marginBottom: '5px', // Adds a small space below each list item
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const legendBoxStyle = {
    backgroundColor: 'black',
    borderRadius: '10px',
    padding: '20px',
    color: 'white',
    fontFamily: 'Patua One',
    minHeight: '190px',
    height: '200px',
  };

  return (
    <div style={legendBoxStyle}>
      <div style={{ textAlign: 'center' }}>
        <h3>Legend</h3>
        <hr />
      </div>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          <span style={circleStyle('red')}></span>Hit
        </li>
        <li style={listItemStyle}>
          <span style={circleStyle('white')}></span>Empty
        </li>
        <li style={listItemStyle}>
          <span style={circleStyle('blue')}></span>Miss
        </li>
      </ul>
    </div>
  );
};

export default Legend;
