import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import QuestionSearch from './QuestionSearch';
import {QueryClientProvider} from 'react-query';
import queryClient from '../../../utils/queryClient';
import {Router} from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {HTTP_STATUS_OK} from '../../../constants/httpStatus';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {act} from 'react-dom/test-utils';

describe('testing Button ', () => {
  const mock = new MockAdapter(axios);
  // eslint-disable-next-line require-jsdoc
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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
    .onGet(`questions?limit=10&offset=10&filter=search`)
    .reply(HTTP_STATUS_OK, mockQuestion);

  const history = createMemoryHistory({
    initialEntries: ['/questions'],
  });
  it('should QuestionSearch and type something', async () => {
    const SEARCH_VALUE = 'search';
    render(
      <QueryClientProvider client={queryClient}>
        <Router location={history.location} navigator={history}>
          <QuestionSearch data-testid="questionSearchInput" />
        </Router>
      </QueryClientProvider>,
    );

    const searchInput = screen.getByTestId('questionSearchInput');

    userEvent.type(searchInput, SEARCH_VALUE);

    await waitFor(() => {
      expect(searchInput).toHaveValue(SEARCH_VALUE);
    });

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      await sleep(2000);
    });

    const questionSearchContainer = screen.getByTestId(
      'questionSearchContainer',
    );
    expect(questionSearchContainer).toBeInTheDocument();
  });

  it('should QuestionSearch open search and close', async () => {
    const SEARCH_VALUE = 'search';
    act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <Router location={history.location} navigator={history}>
            <QuestionSearch data-testid="questionSearchInput" />
          </Router>
        </QueryClientProvider>,
      ),
    );

    const searchInput = screen.getByTestId('questionSearchInput');

    userEvent.type(searchInput, SEARCH_VALUE);

    await waitFor(() => {
      expect(searchInput).toHaveValue(SEARCH_VALUE);
    });

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      await sleep(2000);
    });

    const questionSearchContainer = screen.getByTestId(
      'questionSearchContainer',
    );
    expect(questionSearchContainer).toBeInTheDocument();

    const questionSearchCloseButton = screen.getByTestId(
      'questionSearchCloseButton',
    );

    await waitFor(() => {
      expect(searchInput).toHaveValue(SEARCH_VALUE);
    });

    fireEvent.click(questionSearchCloseButton);

    expect(questionSearchContainer).not.toBeInTheDocument();
  });
});
