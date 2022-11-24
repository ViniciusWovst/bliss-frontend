import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Button from './Button';

describe('testing Button ', () => {
  it('should render Button', () => {
    const BUTTON_CONTENT = 'Button test';
    render(<Button data-testid="Button">{BUTTON_CONTENT}</Button>);

    const button = screen.getByTestId('Button');
    const buttonText = screen.getByText(BUTTON_CONTENT);

    expect(button).toBeInTheDocument();
    expect(buttonText.textContent).toEqual(BUTTON_CONTENT);
  });
});
