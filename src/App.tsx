import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import RouteList from './routes/RouteList';
import queryClient from './utils/queryClient';
import {QueryClientProvider} from 'react-query';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RouteList />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
