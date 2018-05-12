import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions/index";
import ArticleListItem from "./ArticleListItem";
import Recorder from "./Recorder";

// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ArticleListFirebase extends React.Component {

  state = {
    addFormVisible: false,
    recorderVisible: false,
    addFormTitle: "", // this will handle how the form changes
    addFormLink: "" // this will handle how the form changes
  };

  handleTitleChange = event => {
    this.setState({ addFormTitle: event.target.value });
  };

  handleLinkChange = event => {
    this.setState({ addFormLink: event.target.value });
  };

  handleFormSubmit = event => {
    const { addFormTitle, addFormLink } = this.state;
    const { addArticle } = this.props;
    const { user, recorder } = this.props;
    event.preventDefault();

    // define new article
    let newArticle = {
      title: addFormTitle,
      link: addFormLink,
      user: user,
      recordedBlob: recorder
    }

    // add article with stringified format
    addArticle(JSON.parse(JSON.stringify(newArticle)));
    this.setState({
      addFormTitle: "",
      addFormLink: "",
      addFormVisible: false
    });
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
    const { addFormVisible, recorderVisible, addFormTitle, addFormLink } = this.state;

    if (addFormVisible) {
      return (
        <Paper className="col s8 add-form-wrapper" zDepth={2}>
          <div id="article-add-form">
            {recorderVisible ? (<Recorder/>) : (<div></div>)}
            <form onSubmit={this.handleFormSubmit}>
              <div className="input-fields">
                <TextField
                  underlineShow={false}
                  value={addFormTitle}
                  style={{marginBottom: 10, width: '98%'}}
                  onChange={this.handleTitleChange}
                  hintText="Article title here..."
                  fullWidth={true}
                />
                <TextField
                  underlineShow={false}
                  value={addFormLink}
                  style={{marginBottom: 20, width: '98%'}}
                  onChange={this.handleLinkChange}
                  hintText="Paste link here..."
                  fullWidth={true}
                />
                <Toggle
                  label="Show Recorder"
                  onToggle={this.toggleRecorderVisibility}
                />
              </div>
              <RaisedButton
                type="submit"
                className="submit-btn"
                label="Submit"
                primary={true}
                icon={<i className="material-icons">done</i>}
              />
            </form>
          </div>
        </Paper>
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
      <div className="col s10 offset-s1 center-align">
        <img
          alt="Nothing was found"
          id="nothing-was-found"
          src="/img/nothing-found.png"
        />
        <h4>You have no articles here</h4>
        <p>Start by clicking add button in the bottom of the screen</p>
      </div>
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
      <MuiThemeProvider>
        <div className="wrapper">
          <RaisedButton
            className="sign-out-btn"
            onClick={() => signOut()}
            label="Sign Out"
            secondary={true}
            icon={<i className="material-icons">exit_to_app</i>}
          />
          <div className="to-do-list-container">
            <div className="row">
              {this.renderAddForm()}
              {this.renderArticles()}
            </div>
            <div className="fixed-action-btn">
              <button
                onClick={() => this.setState({ addFormVisible: !addFormVisible })}
                className="btn-floating"
              >
                {addFormVisible ? (
                  <i className="material-icons">close</i>
                ) : (
                  <i className="material-icons">add</i>
                )}
              </button>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
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
