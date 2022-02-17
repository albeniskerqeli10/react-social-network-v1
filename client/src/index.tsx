import "@fontsource/inter";
import "@fontsource/manrope";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import { store } from './redux/store';
import './styles/base.css';
import './styles/tailwind.css';
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
// @ts-ignore

const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>

    <App />
    
  </Provider>
);

