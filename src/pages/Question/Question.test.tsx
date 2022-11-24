import React from 'react';
import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import Question from './Question';
import {QueryClientProvider} from 'react-query';
import queryClient from '../../utils/queryClient';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {HTTP_STATUS_OK} from '../../constants/httpStatus';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {act} from 'react-dom/test-utils';

describe('testing question page ', () => {
  const mock = new MockAdapter(axios);

  const mockQuestion = {
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
  };
  mock.onGet(`questions/1`).reply(HTTP_STATUS_OK, mockQuestion);
  mock.onPut(`questions/1`).reply(HTTP_STATUS_OK, mockQuestion);

  it('should render question page', async () => {
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/questions/1']}>
            <Routes>
              <Route
                path="/questions/:questionId"
                element={<Question />}
              ></Route>
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>,
      ),
    );

    const questionContent = screen.getByText('Favourite programming language?');

    expect(questionContent).toBeInTheDocument();
  });

  it('should render question page and click vote button', async () => {
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/questions/1']}>
            <Routes>
              <Route
                path="/questions/:questionId"
                element={<Question />}
              ></Route>
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>,
      ),
    );

    const questionContent = screen.getByText('Favourite programming language?');

    const voteButton = screen.getByTestId('voteButton-1');

    fireEvent.click(voteButton);

    expect(questionContent).toBeInTheDocument();
  });

  it('should render question page and click vote button and click and after click in another choice ', async () => {
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/questions/1']}>
            <Routes>
              <Route
                path="/questions/:questionId"
                element={<Question />}
              ></Route>
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>,
      ),
    );

    const questionContent = screen.getByText('Favourite programming language?');

    const voteButton = screen.getByTestId('voteButton-1');
    const voteButton2 = screen.getByTestId('voteButton-2');

    fireEvent.click(voteButton);

    fireEvent.click(voteButton2);

    expect(questionContent).toBeInTheDocument();
  });

  it('should render question page and click vote button and click again to remove vote ', async () => {
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/questions/1']}>
            <Routes>
              <Route
                path="/questions/:questionId"
                element={<Question />}
              ></Route>
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>,
      ),
    );

    const questionContent = screen.getByText('Favourite programming language?');

    const voteButton = screen.getByTestId('voteButton-1');

    fireEvent.click(voteButton);

    fireEvent.click(voteButton);

    expect(questionContent).toBeInTheDocument();
  });
});
