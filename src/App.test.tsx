import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import App from './App';
import {QueryClientProvider} from 'react-query';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import {act} from 'react-dom/test-utils';
import {HTTP_STATUS_OK} from './constants/httpStatus';
import queryClient from './utils/queryClient';

describe('testing app ', () => {
  const mockInternetConnection = (status: string) => {
    const events = {};
    jest
      .spyOn(window, 'addEventListener')
      .mockImplementation((event, handle) => {
        // @ts-ignore
        events[event] = handle;
      });
    const goOffline = new window.Event(status);
    act(() => {
      window.dispatchEvent(goOffline);
    });
  };
  const mock = new MockAdapter(axios);

  const mockQuestion = [
    {
      id: 1,
      question: 'Favourite programming language?',
      image_url:
        'https://dummyimage.com/600x400/000/fff.png&text=question+1+image+(600x400)',
      thumb_url:
        'https://dummyimage.com/120x120/000/fff.png&text=question+1+image+(120x120)',
      published_at: '2015-08-05T08:40:51.620Z',
      choices: [
        {
          choice: 'Swift',
          votes: 2048,
        },
        {
          choice: 'Python',
          votes: 1024,
        },
        {
          choice: 'Objective-C',
          votes: 512,
        },
        {
          choice: 'Ruby',
          votes: 256,
        },
      ],
    },
    {
      id: 2,
      question: 'Favourite programming language?',
      image_url:
        'https://dummyimage.com/600x400/000/fff.png&text=question+1+image+(600x400)',
      thumb_url:
        'https://dummyimage.com/120x120/000/fff.png&text=question+1+image+(120x120)',
      published_at: '2015-08-05T08:40:51.620Z',
      choices: [
        {
          choice: 'Swift',
          votes: 2048,
        },
        {
          choice: 'Python',
          votes: 1024,
        },
        {
          choice: 'Objective-C',
          votes: 512,
        },
        {
          choice: 'Ruby',
          votes: 256,
        },
      ],
    },
  ];
  mock
    .onGet(`questions?limit=10&offset=10&filter=`)
    .reply(HTTP_STATUS_OK, mockQuestion);

  mock.onGet(`health`).reply(HTTP_STATUS_OK, {
    status: 'OK',
  });

  it('should render question page', async () => {
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>,
      ),
    );

    const firstQuestion = screen.getByTestId('questionItem-0');

    expect(firstQuestion).toBeInTheDocument();
  });

  it('should render offline page', async () => {
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>,
      ),
    );
    mockInternetConnection('offline');

    const noInternetConnection = screen.getByText(
      'Ooops... No internet connection.',
    );

    expect(noInternetConnection).toBeInTheDocument();
  });
});
