import React from 'react';
import firebase, { auth, provider, addTaskToFirebase, removeTaskFromFirebase } from './firebase';
import { connect } from 'react-redux';
import ArticleListFirebase from "./components/ArticleListFirebase";
import ArticleView from './components/ArticleView';
import SignIn from "./components/SignIn";
import requireAuth from "./components/auth/requireAuth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { fetchUser } from "./actions/index";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6E8192',
      main: '#4E657A',
      dark: '#405364',
      contrastText: '#fff',
    },
    secondary: {
      light: '#F06553',
      main: '#ED432D',
      dark: '#C23725',
      contrastText: '#fff',
    },
  },
});

class App extends React.Component {

  componentWillMount() {
    // check if the user exists
    this.props.fetchUser();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" exact component={SignIn} />
            <Route path="/app" exact component={requireAuth(ArticleListFirebase)} />
            <Route path="/app/:id" exact component={requireAuth(ArticleView)} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
};

export default connect(null, { fetchUser })(App);
