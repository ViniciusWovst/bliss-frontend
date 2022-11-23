import React from 'react';
import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import SearchInput from './SearchInput';
import userEvent from '@testing-library/user-event';

describe('testing SearchInput ', () => {
  it('should render SearchInput without fullwidth', () => {
    render(<SearchInput data-testid="inputTest" />);

    const searchInput = screen.getByTestId('inputTest');
    expect(searchInput).toBeInTheDocument();
  });

  it('should render SearchInput with value', async () => {
    const INPUT_VALUE = 'inputValue';
    render(<SearchInput data-testid="inputTest" />);

    const searchInput = screen.getByTestId('inputTest');

    userEvent.type(searchInput, INPUT_VALUE);
    await waitFor(() => {
      expect(searchInput).toHaveValue(INPUT_VALUE);
    });
  });
});
