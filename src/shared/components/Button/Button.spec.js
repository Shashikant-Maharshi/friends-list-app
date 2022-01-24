import React from 'react';

import {
  render,
  cleanup,
  fireEvent,
  screen
} from '@testing-library/react';

import Icons from '../Icons/Icons'
import Button from './Button';

describe('Component: Button', () => {
  const onClick = jest.fn();
  
  const renderComponent = (props) => render(
    <Button
      onClick={onClick}
      {...props}
    />
  );
  
  afterEach(cleanup)
  
  it('should show button with icon & label', () => {
    const { container } = renderComponent({
      label: 'Delete',
      icon: <Icons type='trash' />
    });

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const trashIcon = container.querySelector('svg');
  
    expect(trashIcon).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  })
  
  it('should show button with only icon', () => {
    const { container } = renderComponent({
      label: 'Delete',
      icon: <Icons type='trash' />,
      hasText: false,
    });

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const trashIcon = container.querySelector('svg');
  
    expect(trashIcon).toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  })
  
  it('should show button with only label', () => {
    const { container } = renderComponent({
      label: 'Delete',
    });

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const trashIcon = container.querySelector('svg');
  
    expect(trashIcon).not.toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  })
  
  it('should trigger action on button click', () => {
    renderComponent({
      label: 'Delete',
    });

    fireEvent.click(screen.getByText('Delete'))
  
    expect(onClick).toHaveBeenCalled();
  })
});
