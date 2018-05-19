import React from 'react';
import { signOut } from "../actions/index";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { VoicePlayer, VoiceRecognition } from 'react-voice-components';

// icons
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdPause from 'react-icons/lib/md/pause';

// Material UI Next v1.0.0-rc.0
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// imports for text extraction
import $ from "jquery";

class NavBar extends React.Component {

  state = {
    drawerOpen: false
  }

  toggleDrawer = (open) => {
    console.log("Drawer open: " + open);
    this.setState({
      drawerOpen: open,
    });
  };

  play = (sound) => {
    sound.play();
    // this.setState({recordingIsPlaying: true});
  }

  pause = (sound) => {
    sound.pause();
    // this.setState({recordingIsPlaying: false});
  }

  render() {
    // make the recording available to this environment
    let sound = '';
    if (this.props.article) {
      sound = new Audio(this.props.article.recording);
    }
    const sideList = (
      <div style={{width: 250}}>
        <List></List>
        <Divider />
        <List></List>
      </div>
    );
    return (
      <div style={{flexGrow: 1}}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton onClick={() => this.toggleDrawer(true)} color="inherit" aria-label="Menu" style={{marginLeft: -12, marginRight: 20}}>
              <i className="material-icons">menu</i>
            </IconButton>
            <Typography variant="title" color="inherit" style={{flex: 1}}>
              Lys
            </Typography>
            {/* if we are in the article view, display play/pause buttons */}
            {this.props.articleView ? (
              <div>
                <Button size="small" style={{color: '#fff'}} onClick={() => this.play(sound)}>
                  Play <MdPlayArrow style={{marginLeft: 8, fontSize: 18}} />
                </Button>
                <Button size="small" style={{color: '#fff'}} onClick={() => this.pause(sound)}>
                  Pause <MdPause style={{marginLeft: 8, fontSize: 18}} />
                </Button>
              </div>
            ) : (<div></div>)}
            <Button size="small" style={{color: '#fff'}} onClick={() => this.props.signOut()}>
              Sign Out
              <i className="material-icons right-icon" style={{marginLeft: 8, fontSize: 18}}>exit_to_app</i>
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={this.state.drawerOpen} onClose={() => this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer(false)}
            onKeyDown={() => this.toggleDrawer(false)}
          >
          <div style={{width: 250}}>
            <List>
              <Link to="/app">
                <ListItem button>
                  <ListItemText primary="All articles" />
                </ListItem>
              </Link>
              <Divider />
              <ListItem button onClick={() => this.props.signOut()}>
                <ListItemText primary="Sign Out" />
              </ListItem>
              <ListItem>
                {/*}<VoicePlayer
                  play
                  text="React voice player demonstration"
                />*/}
              </ListItem>
            </List>
          </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default connect(null, { signOut })(NavBar);
