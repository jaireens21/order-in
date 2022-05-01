import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// optional configuration for react-alert
const options = {
  position: positions.TOP_CENTER,
  // timeout: 10000,//10 seconds
  offset: '30px',
  transition: transitions.FADE
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
);

