import React from 'react';

import {
  render,
  cleanup,
  screen
} from '@testing-library/react';

import List from './List';

describe('Component: List', () => {
  const renderComponent = (props) => render(
    <List
      items={[]}
      {...props}
    >
      {(item) => (
        <div>{item.label}</div>
      )}
    </List>
  );
  
  afterEach(cleanup)
  
  it('should show empty list content if no items are available for listing', () => {
    renderComponent();

    expect(screen.getByText('No items to show')).toBeInTheDocument();
  })
  
  it('should render listing for every item provided', () => {
    const { container } = renderComponent({
      items: [{
        id: 'friend-1',
        label: 'Manoj'
      }, {
        id: 'friend-2',
        label: 'Arun'
      }]
    });

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const listItems = container.querySelectorAll('li');

    expect(listItems).toHaveLength(2);
    expect(screen.getByText('Manoj')).toBeInTheDocument();
    expect(screen.getByText('Arun')).toBeInTheDocument();
  })
});
