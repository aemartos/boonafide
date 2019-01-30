import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";

import { Provider } from 'react-redux'
import { store } from './lib/redux/store';

const MainApp = () =>{
  return (
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  )
}

ReactDOM.render(<MainApp/>, document.getElementById('root'));

// to work offline and load faster, change unregister() to register() below. +info: http://bit.ly/CRA-PWA
serviceWorker.unregister();
