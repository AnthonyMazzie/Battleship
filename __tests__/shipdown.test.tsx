import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShipDown from '../src/app/components/ShipDown'; // Adjust the import path as needed

describe('ShipDown Component', () => {
  const mockOnClose = jest.fn();

  it('renders correctly when open is true', () => {
    render(<ShipDown open={true} onClose={mockOnClose} shipName="Destroyer" />);
    expect(screen.getByText('Direct Hit!')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(
      <ShipDown open={false} onClose={mockOnClose} shipName="Destroyer" />
    );
    expect(screen.queryByText('Direct Hit!')).not.toBeInTheDocument();
  });

  it('displays the correct ship name', () => {
    render(<ShipDown open={true} onClose={mockOnClose} shipName="Destroyer" />);
    expect(
      screen.getByText("Brilliant – you've sunk the enemy's Destroyer!")
    ).toBeInTheDocument();
  });

  it('has a clickable Continue button', () => {
    render(<ShipDown open={true} onClose={mockOnClose} shipName="Destroyer" />);
    expect(screen.getByText('Continue')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Continue'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('renders dialog title and description correctly', () => {
    render(<ShipDown open={true} onClose={mockOnClose} shipName="Destroyer" />);
    expect(screen.getByLabelText('Direct Hit!')).toBeInTheDocument();
    expect(
      screen.getByText("Brilliant – you've sunk the enemy's Destroyer!")
    ).toBeInTheDocument();
  });
});
