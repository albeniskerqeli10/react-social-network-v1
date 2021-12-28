import "@fontsource/inter";
import "@fontsource/manrope";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import { store } from './redux/store';
import './styles/base.css';
import './styles/tailwind.css';
ReactDOM.render(
  <Provider store={store}>

    <App />
    
  </Provider>
  , document.getElementById('root'));

