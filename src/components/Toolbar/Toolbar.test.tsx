import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Toolbar from './Toolbar';

describe('testing Toolbar ', () => {
  it('should render Toolbar', () => {
    render(<Toolbar>Toolbar test</Toolbar>);

    const toolbar = screen.getByText('Toolbar test');

    expect(toolbar).toBeInTheDocument();
  });
});
