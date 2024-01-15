import React from 'react';
import { useDrag } from 'react-dnd';
import { ShipProps, ItemTypes } from '../types/types';

const Ship: React.FC<ShipProps> = ({
  id,
  length,
  isVertical,
  coords,
  gameBoardOffset,
  isVisible,
  toggleOrientationFunction,
  draggable,
}) => {
  const [{ isDragging }, drag, preview] = useDrag<
    ShipProps,
    void,
    { isDragging: boolean }
  >({
    type: ItemTypes.SHIP,
    item: {
      id,
      length,
      isVertical,
      coords,
      gameBoardOffset,
      isVisible,
      draggable,
    },
    collect: (monitor: { isDragging: () => any }) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const shipStyles: React.CSSProperties = {
    position: 'absolute',
    border: '2px solid #00f',
    backgroundColor: 'rgba(0, 0, 255, 0.05)',
    cursor: 'move',
    display: isVisible ? 'block' : 'none',
    borderRadius: '15px',
  };

  const pixelPosition = {
    top: `${coords[0].row * 30 + gameBoardOffset.top}px`,
    left: `${coords[0].col * 30 + gameBoardOffset.left}px`,
  };

  const shipClasses = `ship ${isDragging ? 'dragging' : ''}`;

  return (
    <div
      ref={draggable ? preview : drag}
      className={shipClasses}
      style={{
        ...shipStyles,
        ...pixelPosition,
        width: !isVertical ? `${30 * length}px` : '30px',
        height: isVertical ? `${30 * length}px` : '30px',
        opacity: isDragging ? 0.3 : 0.7,
      }}
      onClick={toggleOrientationFunction}
    />
  );
};

export default Ship;
