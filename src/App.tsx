import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from './views/Layout';

import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

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
