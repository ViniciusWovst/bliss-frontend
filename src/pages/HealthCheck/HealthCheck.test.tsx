import React from 'react';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import HealthCheck from './HealthCheck';
import {QueryClientProvider} from 'react-query';
import queryClient from '../../utils/queryClient';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {HTTP_STATUS_OK} from '../../constants/httpStatus';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {act} from 'react-dom/test-utils';

describe('testing Healthcheck page ', () => {
  const history = createMemoryHistory({initialEntries: ['/']});
  const mock = new MockAdapter(axios);

  it('should render HealthCheck page and redirect to questions page', async () => {
    mock.onGet(`health`).reply(HTTP_STATUS_OK, {
      status: 'OK',
    });
    await act(() =>
      render(
        <Router location={history.location} navigator={history}>
          <QueryClientProvider client={queryClient}>
            <HealthCheck />
          </QueryClientProvider>
        </Router>,
      ),
    );

    expect(history.location.pathname).toEqual('/questions');
  });
});
