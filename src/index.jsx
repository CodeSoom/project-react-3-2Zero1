import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter,
} from 'react-router-dom';

import { Provider } from 'react-redux';

import App from './App';

import store from './state/store';

import './assets/css/global.css';

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter basename="/project-react-3-2Zero1">
        <App />
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('app'),
);
