import React from 'react';
import firebase, { auth, provider, addTaskToFirebase, removeTaskFromFirebase } from './firebase';
import './App.css';
import { connect } from 'react-redux';
// import ArticleList from './components/ArticleList';
import ArticleListFirebase from "./components/ArticleListFirebase";
import SignIn from "./components/SignIn";
import requireAuth from "./components/auth/requireAuth";
import { BrowserRouter, Route } from "react-router-dom";
import { fetchUser } from "./actions/index";

class App extends React.Component {
  componentWillMount() {
    // check if the user exists
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={SignIn} />
          <Route path="/app" component={requireAuth(ArticleListFirebase)} />
        </div>
      </BrowserRouter>
    );
  }
};

export default connect(null, { fetchUser })(App);
