import React from 'react';
import Recorder from '../recorder.js';
import { connect } from 'react-redux';
import { encodeAudio, updateFirebaseArticle } from '../actions/index';

// icons
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdStop from 'react-icons/lib/md/stop';

import Button from '@material-ui/core/Button';
import $ from 'jquery';

let base64data = '';

class RecorderComponent extends React.Component {
  // Expose the audio_context, the recorder instance and audio_stream in the state
  state = {
    audio_stream: '',
    recorder: '',
    audio_context: '',
    recordingString: '',
  }

  componentDidMount() {
    // this prevents buttons from remaining focused
    $("button").mouseup(function() {
      $(this).blur();
    })
  }

  componentWillMount() {
    this.initialize();
  }

  /**
   * Patch the APIs for every browser that supports them and check
   * if getUserMedia is supported on the browser.
   *
   */
  initialize() {
    try {
      // Monkeypatch for AudioContext, getUserMedia and URL
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;

      // Store the instance of AudioContext globally
      this.setState({ audio_context: new AudioContext });
      console.log('Audio context is ready !');
      console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      alert('No web audio support in this browser!');
    }
  }

  /**
   * Starts the recording process by requesting the access to the microphone.
   * Then, if granted proceed to initialize the library and store the stream.
   *
   * It only stops when the method stopRecording is triggered.
   */
  startRecording = () => {
    // Access the Microphone using the navigator.getUserMedia method to obtain a stream
    navigator.getUserMedia({
      audio: true
    }, (stream) => {
      // Expose the stream to be accessible globally
      this.setState({ audio_stream: stream });
      // Create the MediaStreamSource for the Recorder library
      let input = this.state.audio_context.createMediaStreamSource(stream);
      console.log('Media stream succesfully created');

      // Initialize the Recorder Library
      this.setState({ recorder: new Recorder(input) });
      console.log('Recorder initialised');

      // Start recording !
      this.state.recorder && this.state.recorder.record();
      console.log('Recording...');

    }, function(error) {
      console.error('No live audio input: ' + error);
    });
  }

  /**
   * Stops the recording process. The method expects a callback as first
   * argument (function) executed once the AudioBlob is generated and it
   * receives the same Blob as first argument. The second argument is
   * optional and specifies the format to export the blob either wav or mp3
   */
  stopRecording = (callback, AudioFormat) => {
    const { encodeAudio } = this.props;

    // Stop the recorder instance
    this.state.recorder && this.state.recorder.stop();
    console.log('Stopped recording.');

    // Stop the getUserMedia Audio Stream !
    this.state.audio_stream.getAudioTracks()[0].stop();

    // Use the Recorder Library to export the recorder Audio as a .wav file
    // The callback providen in the stop recording method receives the blob
    if (typeof(callback) == "function") {

      /**
       * Export the AudioBLOB using the exportWAV method.
       * Note that this method exports too with mp3 if
       * you provide the second argument of the function
       */
      this.state.recorder && this.state.recorder.exportWAV((blob) => {
        console.log('blob: ', blob);
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        // encode as base64string
        reader.onloadend = () => {
          this.setState({ recordingString: reader.result })
          // send the recording to the store
          encodeAudio(reader.result);
        }

        // call callback function
        callback(blob);

        // Clear the Recorder to start again !
        this.state.recorder.clear();
      }, (AudioFormat || "audio/wav"));
    }
  }

  updateArticle = () => {
    const { articleId, article } = this.props;
    const { encodeAudio, updateFirebaseArticle, recorder } = this.props;
    updateFirebaseArticle(articleId, { recording: recorder });
    // send data back to the ArticleView to update the NavBar
    this.props.callbackFromParent(recorder);
    // empty the Recorder reducer
    encodeAudio(null);
  }

  replayRecording = () => {
    const { recorder } = this.props;
    console.log('sent to the store: ', recorder);
    const sound = new Audio(this.state.recordingString);
    sound.play();
  }

  componentDidMount() {
    // Prepare and check if requirements are filled
    this.initialize();
  }

  render() {
    return (
      <div>
        <Button size="small" onClick = {() => this.startRecording()}>
          Start <MdPlayArrow style={{marginLeft: 8, fontSize: 18}} />
        </Button>
        <Button size="small" onClick = {() => this.stopRecording(() => {console.log("stopped")}, "audio/wav")}>
          Stop <MdStop style={{marginLeft: 8, fontSize: 18}}/>
        </Button>
        {this.props.articleView ? (
          <Button size="small" disabled={this.state.recordingString === ''} onClick = {() => this.updateArticle()}>
            Update Article
          </Button>
        ) : (<div></div>)
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  recorder: state.recorder
});

export default connect(mapStateToProps, { encodeAudio, updateFirebaseArticle })(RecorderComponent);
