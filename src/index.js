import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LogIn />
  </React.StrictMode>
);