import React from 'react';
import { connect } from "react-redux";
import { ReactMic } from 'react-mic';
import { encodeAudio } from '../actions/index';
import Microm from 'microm';
const microm = new Microm();
let mp3 = null;

// icons
import FaPlay from 'react-icons/lib/fa/play';
import FaStop from 'react-icons/lib/fa/stop';

// Material UI Next v1.0.0-rc.0
import Button from '@material-ui/core/Button';

class Recorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      recordedBlob: {}
    }
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
        microm.getBase64().then(function(base64string) {
          // this is what we want to send to the database
          console.log("encoded the audio and sent to the store");
          // at the moment, if the user presses submit before this is done, the recording is not saved
          encodeAudio(base64string);
        });
      });
  }

  onStop = (recordedBlob) => {
    this.setState({
      recordedBlob: recordedBlob
    });
  }

  render() {
    return (
      <div className="recorder-wrapper">
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          strokeColor="#f50057"
          backgroundColor="#fff" />
        <div className="recorder-buttons">
          <Button mini variant="fab" color="secondary" aria-label="start" onClick={this.startRecording}>
            <FaPlay style={{width: 17}} />
          </Button>
          <Button mini variant="fab" color="secondary" aria-label="stop" onClick={this.stopRecording}>
            <FaStop style={{width: 17}} />
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(null, { encodeAudio })(Recorder);
