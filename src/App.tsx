import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import RouteList from './routes/RouteList';
import queryClient from './utils/queryClient';
import {QueryClientProvider} from 'react-query';
import {OnlineStatusProvider} from './context/OnlineStatusContext';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <OnlineStatusProvider>
        <BrowserRouter>
          <RouteList />
        </BrowserRouter>
      </OnlineStatusProvider>
    </QueryClientProvider>
  );
};

export default App;
