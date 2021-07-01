import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './assets/redux/store';

ReactDOM.render(
  <React.StrictMode>
    <div
      className="bg-darkGray"
      style={{
        background: 'linear-gradient(298.31deg, #232323 20%, rgba(22, 22, 22, 0.78) 84.83%)',
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
