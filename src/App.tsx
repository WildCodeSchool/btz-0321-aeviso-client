import React from 'react';
import { QueryClientProvider } from 'react-query';
import queryClient from './API/query-client';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './views/Layout';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useDarkModeFromStore } from './store/darkmode.slice';
import './assets/scrollbar.css';

function App(): JSX.Element {
  const { darkMode } = useDarkModeFromStore();
  return (
    <div className={`${darkMode.active ? 'bg-mainBg dark' : 'bg-whiteGray'}`}>
      <div className="">
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
