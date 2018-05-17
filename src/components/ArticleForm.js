import React from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/index";
import Recorder from "./Recorder";

// updating to Material UI v1.0.0-rc.0
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class ArticleForm extends React.Component {

  state = {
    addFormVisible: false,
    recorderVisible: false,
    submitButtonVisble: false,
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
    // recorder is the base64string of the recording received through the action
    const { user, recorder } = this.props;
    event.preventDefault();

    console.log("the recording is: ", recorder);

    // define new article
    let newArticle = {
      title: addFormTitle,
      link: addFormLink,
      user: user,
      recording: recorder
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
    const { recorderVisible } = this.state;
    this.setState({recorderVisible: !recorderVisible});
  };

  render() {
    const { addFormVisible, recorderVisible, addFormTitle, addFormLink } = this.state;
    return (
      <Paper className="add-form-wrapper" elevation={2}>
        <div style={{width: "100%"}}>
          {recorderVisible ? (<Recorder/>) : (<div></div>)}
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-fields">
              <TextField
                id="article-title"
                label="Article Title"
                value={addFormTitle}
                style={{marginBottom: 10, width: '98%'}}
                onChange={this.handleTitleChange}
                margin="normal"
                fullWidth={true}
              />
              <TextField
                id="article-link"
                label="Article Link"
                value={addFormLink}
                style={{marginBottom: 20, width: '98%'}}
                onChange={this.handleLinkChange}
                margin="normal"
                fullWidth={true}
              />
            </div>
            <FormControlLabel
              control={
                <Switch
                  onChange={this.toggleRecorderVisibility}
                  value="recorder"
                  color="primary"
                />
              }
              label="Show recorder"
            />
            <Button type="submit" className="button submit-btn" variant="raised" color="primary">
              Submit
              <i className="material-icons right-icon" style={{marginLeft: 10}}>done</i>
            </Button>
          </form>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
  user: state.auth,
  recorder: state.recorder
});

export default connect(mapStateToProps, actions)(ArticleForm);
