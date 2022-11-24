import React from 'react';
import '@testing-library/jest-dom';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import Questions from './Questions';
import {QueryClientProvider} from 'react-query';
import queryClient from '../../utils/queryClient';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {HTTP_STATUS_OK} from '../../constants/httpStatus';
import {MemoryRouter, Route, Router, Routes} from 'react-router-dom';
import {act} from 'react-dom/test-utils';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';

describe('testing question page ', () => {
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

  it('should render question page', async () => {
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/questions']}>
            <Routes>
              <Route path="/questions" element={<Questions />}></Route>
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>,
      ),
    );

    const firstQuestion = screen.getByTestId('questionItem-0');

    expect(firstQuestion).toBeInTheDocument();
  });

  it('should render question page and click in the first item', async () => {
    const history = createMemoryHistory({initialEntries: ['/questions']});
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <Router location={history.location} navigator={history}>
            <Questions />
          </Router>
        </QueryClientProvider>,
      ),
    );

    const firstQuestion = screen.getByTestId('questionItem-0');

    fireEvent.click(firstQuestion);

    expect(firstQuestion).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/questions/1');
  });

  it('should render question page and search a question by url', async () => {
    jest
      .spyOn(URLSearchParams.prototype, 'get')
      .mockReturnValue('questionFilter');

    const history = createMemoryHistory({
      initialEntries: ['/questions?filter=questionFilter'],
    });
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <Router location={history.location} navigator={history}>
            <Questions />
          </Router>
        </QueryClientProvider>,
      ),
    );

    const firstQuestion = screen.getByTestId('questionItem-0');
    const searchInput = screen.getByTestId('questionSearchInput');

    await waitFor(() => {
      expect(searchInput).toHaveValue('questionFilter');
    });

    expect(firstQuestion).toBeInTheDocument();
  });

  it('should render question page and search a question typing in search field', async () => {
    mock
      .onGet(`questions?limit=10&offset=10&filter=search`)
      .reply(HTTP_STATUS_OK, mockQuestion);

    const history = createMemoryHistory({
      initialEntries: ['/questions'],
    });
    const SEARCH_VALUE = 'search';
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <Router location={history.location} navigator={history}>
            <Questions />
          </Router>
        </QueryClientProvider>,
      ),
    );

    const firstQuestion = screen.getByTestId('questionItem-0');
    const searchInput = screen.getByTestId('questionSearchInput');
    userEvent.type(searchInput, SEARCH_VALUE);

    await waitFor(() => {
      expect(searchInput).toHaveValue(SEARCH_VALUE);
    });

    expect(firstQuestion).toBeInTheDocument();
  });
});
