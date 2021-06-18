import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Routes from '../src/components/Routes';

import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Routes />
          </Switch>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
