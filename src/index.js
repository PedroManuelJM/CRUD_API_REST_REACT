import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import reportWebVitals from './reportWebVitals';
import Usuario from './Components/Usuario';
import { HashRouter,Route, Switch} from "react-router-dom";
ReactDOM.render(

  <React.StrictMode>
    <HashRouter basename={process.env.PUBLIC_URL + "/"}>
      <Switch>
        <Route exact path="/" component={Usuario} />
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
