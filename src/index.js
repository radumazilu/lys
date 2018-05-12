import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from "redux-thunk";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { allReducers } from './reducers/index';

// create store with allReducers, initialState and the code for redux devTools
const store = createStore(
  allReducers,
  {},
  // window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(reduxThunk)
);

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
