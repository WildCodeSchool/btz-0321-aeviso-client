import React from 'react';
import { QueryClientProvider } from 'react-query';
import queryClient from './API/query-client';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './views/Layout';
import { ReactQueryDevtools } from 'react-query/devtools';

function App({ isDarkMode }: { isDarkMode: boolean }): JSX.Element {
  return (
    <div className={`${isDarkMode ? 'bg-mainBg dark' : 'bg-whiteGray'}`}>
      <div className="container m-auto dark:bg-mainBg">
        <QueryClientProvider client={queryClient}>
          <Router>
            <Layout />
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
