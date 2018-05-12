import React from 'react';
import { connect } from "react-redux";
import { ReactMic } from 'react-mic';
import { recordBlob } from '../actions/index';

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
  }

  stopRecording = () => {
    this.setState({
      record: false
    });
  }

  onStop = (recordedBlob) => {
    this.setState({
      recordedBlob: recordedBlob
    });
    // ---- experiment with converting blob to mp3 ----

    // var file = {};
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', recordedBlob.blobURL, true);
    // xhr.responseType = 'blob';
    // xhr.onload = function(e) {
    //   if (this.status == 200) {
    //     file.file = this.response;
    //     file.name = "recording.mp3";
    //     // file.size = getYourBlobSize();
    //     file.type = "audio/mpeg";
    //     uploadAudioBlobs(file);
    //   }
    // };
    // xhr.send();

    // ---- end experiment ----
    this.props.recordBlob(recordedBlob);
    console.log('recordedBlob is: ', recordedBlob);
  }

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          strokeColor="rgb(0, 188, 212)"
          backgroundColor="#F8F8F8" />
        <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>
        {this.state.recordedBlob.blobURL ? (
          <audio controls src={this.state.recordedBlob.blobURL}></audio>
        ) : (<div></div>)}
      </div>
    );
  }
}

export default connect(null, { recordBlob })(Recorder);
