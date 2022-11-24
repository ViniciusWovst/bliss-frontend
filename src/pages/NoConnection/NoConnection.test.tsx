import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import NoConnection from './NoConnection';

describe('testing NoConnection page ', () => {
  it('should render NoConnection page', () => {
    render(<NoConnection />);

    const content = screen.getByText('Ooops... No internet connection.');

    expect(content).toBeInTheDocument();
  });
});
