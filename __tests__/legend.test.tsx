import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Legend from '../src/app/components/Legend';

describe('Legend', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Legend />);
    expect(getByText('Legend')).toBeInTheDocument();
  });

  it('displays the correct items', () => {
    const { getByText } = render(<Legend />);
    expect(getByText('Hit')).toBeInTheDocument();
    expect(getByText('Miss')).toBeInTheDocument();
    expect(getByText('Empty')).toBeInTheDocument();
  });

  it('has a list with no list style', () => {
    const { container } = render(<Legend />);
    const list = container.querySelector('ul');
    expect(list).toHaveStyle('listStyleType: none');
  });

  it('has list items with flex display', () => {
    const { container } = render(<Legend />);
    const listItems = container.querySelectorAll('li');
    listItems.forEach((item) => {
      expect(item).toHaveStyle('display: flex');
    });
  });

  it('checks if header is centered', () => {
    const { getByText } = render(<Legend />);
    const header = getByText('Legend').parentNode;
    expect(header).toHaveStyle('textAlign: center');
  });

  it('checks if horizontal rule is present', () => {
    const { container } = render(<Legend />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });
});
