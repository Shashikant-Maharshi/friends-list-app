import React from 'react';

import {
  render,
  cleanup,
  fireEvent,
  screen
} from '@testing-library/react';

import ConfirmEvent from './ConfirmEvent';

describe('Component: ConfirmEvent', () => {
  const onConfirm = jest.fn();
  const onCancel = jest.fn();
  
  const renderComponent = (props) => render(
    <ConfirmEvent
      onConfirm={onConfirm}
      onCancel={onCancel}
      {...props}
    >
      <div>My Friend Card</div>
    </ConfirmEvent>
  );
  
  afterEach(cleanup)
  
  it('should show my friend card content', () => {
    renderComponent({
      title: 'My Friend Card',
    });

    expect(screen.getByText('My Friend Card')).toBeInTheDocument();
  })
  
  it('should show confirm event box', () => {
    renderComponent({
      title: 'My Friend Card',
      show: true,
    });

    expect(screen.getByText('Are you sure you want to delete "My Friend Card"?')).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Confirm/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  })
  
  it('should allow user to click confirm button within confirmation prompt', () => {
    renderComponent({
      title: 'My Friend Card',
      show: true,
    });

    fireEvent.click(screen.getByRole("button", { name: /Confirm/i }));

    expect(onConfirm).toHaveBeenCalled();
  })
  
  it('should allow user to click cancel button within confirmation prompt', () => {
    renderComponent({
      title: 'My Friend Card',
      show: true,
    });

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(onCancel).toHaveBeenCalled();
  })
});
