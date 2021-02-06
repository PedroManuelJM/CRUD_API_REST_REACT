import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import reportWebVitals from './reportWebVitals';
import Usuario from './Components/Usuario';

ReactDOM.render(
  <React.StrictMode>
   <Usuario/>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
