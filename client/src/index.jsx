import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './lib/redux/store';
import App from './App';
import './index.scss';
import * as serviceWorker from './serviceWorker';

function MainApp() {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}

ReactDOM.render(<MainApp />, document.getElementById('root'));

// to work offline and load faster, change unregister() to register() below. +info: http://bit.ly/CRA-PWA
serviceWorker.unregister();
