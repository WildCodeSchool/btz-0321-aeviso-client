import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './assets/redux/store';

ReactDOM.render(
  <React.StrictMode>
    <div
      style={{
        background: 'linear-gradient(298.31deg, #232323 0%, rgba(22, 22, 22, 0.78) 84.83%)',
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
