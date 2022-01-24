import React from 'react';

import {
  render,
  cleanup,
  fireEvent,
  screen
} from '@testing-library/react';

import Pagination from './Pagination';

describe('Component: Pagination', () => {
  const onAction = jest.fn();
  
  const renderComponent = (props) => render(
    <Pagination
      onAction={onAction}
      {...props}
    />
  );
  
  afterEach(cleanup)
  
  it('should show pagination component with previous, next and pagination group buttons', () => {
    renderComponent({
      data: [],
      dataLimit: 4,
      pageLimit: 3,
    });

    expect(screen.getByText('prev')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('next')).toBeInTheDocument();
  })
  
  it('should gracefully manage enabled/disabled states of pagination controls', () => {
    renderComponent({
      data: Array.from({ length: 6 }, (_, idx) => idx),
      dataLimit: 4,
      pageLimit: 3,
    });

    expect(screen.getByText('prev')).toHaveProperty('disabled', true);
    expect(screen.getByText('1')).toHaveProperty('disabled', false);
    expect(screen.getByText('2')).toHaveProperty('disabled', false);
    expect(screen.getByText('3')).toHaveProperty('disabled', true);
    expect(screen.getByText('next')).toHaveProperty('disabled', false);
  });
  
  it('should call onAction event when current page gets changed', () => {
    renderComponent({
      data: Array.from({ length: 6 }, (_, idx) => idx),
      dataLimit: 4,
      pageLimit: 3,
    });

    // prev & next buttons state before paginatio group button click
    expect(screen.getByText('prev')).toHaveProperty('disabled', true);
    expect(screen.getByText('next')).toHaveProperty('disabled', false);

    fireEvent.click(screen.getByText('2'));

    // make sure page no.2 shows 4 to 8 slice of data items
    expect(onAction).toHaveBeenCalledWith(4, 8);
    // prev & next buttons state after paginatio group button click
    expect(screen.getByText('prev')).toHaveProperty('disabled', false);
    expect(screen.getByText('next')).toHaveProperty('disabled', true);
  });
});
