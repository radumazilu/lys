import React from 'react';
import firebase, { auth, provider, addTaskToFirebase, removeTaskFromFirebase } from './firebase';
import { connect } from 'react-redux';
import ArticleListFirebase from "./components/ArticleListFirebase";
import ArticleView from './components/ArticleView';
import SignIn from "./components/SignIn";
import requireAuth from "./components/auth/requireAuth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { fetchUser } from "./actions/index";

class App extends React.Component {
  
  componentWillMount() {
    // check if the user exists
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" exact component={SignIn} />
          <Route path="/app" exact component={requireAuth(ArticleListFirebase)} />
          <Route path="/app/:id" exact component={ArticleView} />
        </Switch>
      </BrowserRouter>
    );
  }
};

export default connect(null, { fetchUser })(App);
