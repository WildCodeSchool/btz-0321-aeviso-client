import React from 'react';
import { QueryClientProvider } from 'react-query';
import queryClient from './API/query-client';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from './views/Layout';

import { ReactQueryDevtools } from 'react-query/devtools';

function App(): JSX.Element {
  return (
    <div
      className="m-auto container bg-darkGray"
      style={{
        maxWidth: 1440,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout />
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
