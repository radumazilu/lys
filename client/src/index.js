import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from "redux-thunk";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { allReducers } from './reducers/index';

// create store with allReducers, initialState and reduxThunk
const store = createStore(
  allReducers,
  {},
  // window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(reduxThunk)
);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter history={hashHistory}>
      <Route path="/" component={App}></Route>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
