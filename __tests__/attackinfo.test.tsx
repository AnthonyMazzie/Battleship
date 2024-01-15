import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AttackInfo from '../src/app/components/AttackInfo';

describe('AttackInfo', () => {
  it('displays the correct attack cell coordinates', () => {
    const mockAttackCell = { row: 2, col: 3 };
    const { getByText } = render(
      <AttackInfo
        attackCell={mockAttackCell}
        playerAttack={() => {}}
        turn="player"
      />
    );
    expect(getByText('[2,3]')).toBeInTheDocument();
  });

  it('enables the attack button for player turn', () => {
    const { getByText } = render(
      <AttackInfo
        attackCell={{ row: 0, col: 0 }}
        playerAttack={() => {}}
        turn="player"
      />
    );
    expect(getByText('Attack')).not.toBeDisabled();
  });

  it('disables the attack button for computer turn', () => {
    const { getByText } = render(
      <AttackInfo
        attackCell={{ row: 0, col: 0 }}
        playerAttack={() => {}}
        turn="computer"
      />
    );
    expect(getByText('Attack')).toBeDisabled();
  });

  it('calls playerAttack when attack button is clicked', () => {
    const mockPlayerAttack = jest.fn();
    const { getByText } = render(
      <AttackInfo
        attackCell={{ row: 0, col: 0 }}
        playerAttack={mockPlayerAttack}
        turn="player"
      />
    );

    fireEvent.click(getByText('Attack'));
    expect(mockPlayerAttack).toHaveBeenCalled();
  });

  it('has the correct styling', () => {
    const { getByText } = render(
      <AttackInfo
        attackCell={{ row: 0, col: 0 }}
        playerAttack={() => {}}
        turn="player"
      />
    );

    const attackCellDisplay = getByText('[0,0]').parentNode;
    expect(attackCellDisplay).toHaveStyle('border: 1px solid black');
    expect(attackCellDisplay).toHaveStyle('borderRadius: 5px');
  });

  it('updates attack cell coordinates when they change', () => {
    const { getByText, rerender } = render(
      <AttackInfo
        attackCell={{ row: 0, col: 0 }}
        playerAttack={() => {}}
        turn="player"
      />
    );

    // Change attack cell
    rerender(
      <AttackInfo
        attackCell={{ row: 1, col: 1 }}
        playerAttack={() => {}}
        turn="player"
      />
    );

    expect(getByText('[1,1]')).toBeInTheDocument();
  });
});
