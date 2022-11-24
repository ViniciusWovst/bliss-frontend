import React from 'react';
import '@testing-library/jest-dom';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import ShareButton from './ShareButton';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {HTTP_STATUS_OK} from '../../constants/httpStatus';

describe('testing ShareButton ', () => {
  it('should render ShareButton', () => {
    render(
      <ShareButton
        urlToShare="www.example.com"
        inputProps={{'data-testid': 'inputTest'}}
        data-testid="shareButtonTest"
      />,
    );

    const searchInput = screen.getByTestId('inputTest');
    const searchButton = screen.getByTestId('shareButtonTest');

    fireEvent.blur(searchInput);
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('should render ShareButton and share a link ', async () => {
    const EMAIL_TO_SHARE = 'test@example.com';
    const URL_TO_SHARE = 'www.example.com';

    const mock = new MockAdapter(axios);
    mock
      .onPost(
        `share?destination_email=${EMAIL_TO_SHARE}&content_url=${URL_TO_SHARE}`,
      )
      .reply(HTTP_STATUS_OK, {
        status: 'OK',
      });

    render(
      <ShareButton
        urlToShare={URL_TO_SHARE}
        inputProps={{'data-testid': 'inputTest'}}
        data-testid="shareButtonTest"
      />,
    );

    const searchInput = screen.getByTestId('inputTest');
    const searchButton = screen.getByTestId('shareButtonTest');

    waitFor(() => {
      fireEvent.click(searchButton);
      userEvent.type(searchInput, EMAIL_TO_SHARE);
    });

    await waitFor(() => {
      expect(searchInput).toHaveValue(EMAIL_TO_SHARE);
    });

    fireEvent.click(searchButton);

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
