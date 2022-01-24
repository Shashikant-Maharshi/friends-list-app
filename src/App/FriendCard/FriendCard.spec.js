import React from 'react';

import {
  render,
  cleanup,
  fireEvent,
  screen
} from '@testing-library/react';

import FriendCard from './FriendCard';

describe('Component: FriendCard', () => {
  const onAction = jest.fn();
  const friend = { id: 'my-id-1', name: 'Ashok' }; 
  
  const renderComponent = () => {
    render(
      <FriendCard
        friend={friend}
        onAction={onAction}
      />
    );
  };
  
  afterEach(cleanup)
  
  it('should show friend name & short description', () => {
    renderComponent();
  
    expect(screen.getAllByText('Ashok')).toHaveLength(1);
    expect(screen.getAllByText('is your friend')).toHaveLength(1);
  })
  
  it('should allow user to click favourite action', () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /Favourite/i }))
    
    expect(onAction).toHaveBeenCalledWith('toggle-favourite', friend);
  })
  
  it('should allow user to click delete action', () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /Delete/i }))
    
    expect(onAction).toHaveBeenCalledWith('delete', friend);
  })
});
