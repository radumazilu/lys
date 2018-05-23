import React from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import RecorderComponent from './RecorderComponent';
import { encodeAudio, updateFirebaseArticle } from '../actions/index';

import Microm from 'microm';
const microm = new Microm();
let mp3 = null;

// Material UI Next v1.0.0-rc.0
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import $ from 'jquery';

class ArticleView extends React.Component {

  state = {
    recordedAudio: false, // becomes true of the user finishes recording the audio
    localRecording: this.props.location.state.article.recording || null // also hold the recording to update it in real time
  }

  componentDidMount() {
    // this prevents buttons from remaining focused
    $("button").mouseup(function() {
      $(this).blur();
    })
  }

  extractHostname = (url) => {
    let hostname = '';
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  }

  componentDidMount() {
    const { id } = this.props.match.params;
  }

  startRecording = () => {
    this.setState({
      record: true
    });
    microm.record().then(function() {
      console.log('recording...')
    }).catch(function() {
      console.log('error recording');
    });
  }

  stopRecording = () => {
    const { encodeAudio } = this.props;
    this.setState({
      record: false
    });
    microm.stop()
      .then((result) => {
        console.log('recording is stopped');
        microm.getBase64().then(function(base64string) {
          // this is what we want to send to the database
          console.log("encoded the audio and sent to the store");
          // send to the store
          encodeAudio(base64string);
        });
      });
    this.setState({ recordedAudio: true });
  }

  getBackRecordingFromChild = (rec) => {
    this.setState({ localRecording: rec })
  }

  render() {
    const { article } = this.props.location.state;
    const { id } = this.props.match.params;
    const bull = <span style={{display: 'inline-block', margin: '0 2px', transform: 'scale(0.8)'}}>•</span>;
    return (
      <div>
        <NavBar articleView={true} recording={this.state.localRecording} />
        <div className="content-wrapper" style={{ paddingTop: 64 }}>
          <Card style={{maxWidth: 730, padding: 30, boxShadow: 'none', minWidth: '50%'}}>
            <CardContent>
              <Typography style={{marginBottom: 16, fontSize: 14}} color="textSecondary">
                by {article.user.displayName}
              </Typography>
              <Typography variant="headline" component="h2">
                {article.title}
              </Typography>
              <Typography style={{marginBottom: 18, marginTop: 6}} color="textSecondary">
                from <a href={article.link}>{this.extractHostname(article.link)}</a>
              </Typography>
              {article.scrapedContent ? (
                <Typography component="p" id="content-text" style={{lineHeight: '1.8em'}}>
                  {article.scrapedContent}
                </Typography>
              ) : (
                <Typography component="p" id="content-text" style={{lineHeight: '1.8em'}}>
                  no content here yet :(
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
        <div className="recording-buttons">
          <Card>
            <CardContent style={{textAlign: 'justify'}}>
              <Typography style={{marginBottom: 16, fontSize: 14}} color="textSecondary">
                This article doesn't have a recording yet
              </Typography>
              <Typography variant="headline" component="h2">
                Would you like to read it out loud?
              </Typography>
            </CardContent>
            <CardActions className="article-recording-actions">
              <RecorderExperiment callbackFromParent={this.getBackRecordingFromChild} articleView={true} article={article} articleId={id} />
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recorder: state.recorder
});

export default connect(mapStateToProps, { encodeAudio, updateFirebaseArticle })(ArticleView);
