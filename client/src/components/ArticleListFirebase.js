import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import ArticleListItem from './ArticleListItem';
import Recorder from './Recorder';
import ArticleForm from './ArticleForm';
import NavBar from './NavBar';

// Material UI Next v1.0.0-rc.0
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


class ArticleListFirebase extends React.Component {

  state = {
    addFormVisible: false
  };

  toggleRecorderVisibility = () => {
    if (this.state.recorderVisible) {
      this.setState({recorderVisible: false});
    }
    else {
      this.setState({recorderVisible: true});
    }
  };

  renderAddForm = () => {
    const { addFormVisible } = this.state;
    if (addFormVisible) {
      return (
        <ArticleForm />
      );
    }
  };

  renderArticles() {
    const articles = this.props.articles;
    const fetchedArticles = _.map(articles, (value, key) => {
      return <ArticleListItem key={key} articleId={key} article={value} />;
    });
    if (!_.isEmpty(fetchedArticles)) {
      return fetchedArticles;
    }
    return (
      <Grid item xs={12}>
        <Paper className="nothing-found">
          <img
            alt="Nothing was found"
            id="nothing-was-found"
            src="/img/nothing-found.png"
          />
          <h4>You have no articles here</h4>
          <p>Start by clicking add button in the bottom of the screen</p>
        </Paper>
      </Grid>
    );
  }

  componentWillMount() {
    // when the component mounts, fetch all articles
    this.props.fetchArticles();
  }

  render() {
    const { addFormVisible } = this.state;
    const signOut = this.props.signOut;
    return (
      <div>
        <NavBar />
        {this.renderAddForm()}
        <div className="wrapper container">
          <div className="article-list-container">
            <Grid container spacing={8}>
              {this.renderArticles()}
            </Grid>
            <div className="fixed-action-btn" style={{zIndex: 1500}}>
              <Button variant="fab" color="primary" aria-label="add"
                onClick={() => this.setState({ addFormVisible: !addFormVisible })}>
                {addFormVisible ? (
                  <i className="material-icons">close</i>
                ) : (
                  <i className="material-icons">add</i>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
  user: state.auth,
  recorder: state.recorder
});

// give the actions with mapDispatchToProps()
export default connect(mapStateToProps, actions)(ArticleListFirebase);
