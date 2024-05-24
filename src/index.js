import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import for createRoot
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './global.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Create root

root.render(
  <Provider store={store}>
    <App />
  </Provider>
  ); // Add closing parenthesis
