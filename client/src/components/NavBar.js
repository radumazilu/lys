import React from 'react';
import { signOut } from "../actions/index";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

// updating to Material UI v1.0.0-rc.0
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

  render() {
    // ---- EXPERIMENT WITH GRABBING HTML FROM URL ----
   //  const url = 'http://allorigins.me/get?url=' + encodeURIComponent('http://www.polygon.com/2014/6/26/5842180/shovel-knight-review-pc-3ds-wii-u') + '&callback=?';
   //
   //  $.ajax({
   //    type:'get',
   //    url:'/scrape',
   //    cache:false,
   //    async:'asynchronous',
   //    dataType:'json',
   //    success: function(data) {
   //      console.log(JSON.stringify(data))
   //    },
   //    error: function(request, status, error) {
   //      console.log("Error: " + error)
   //    }
   // });

    // const extractor = require('unfluff');
    // const url = 'http://allorigins.me/get?url=' + encodeURIComponent('http://www.polygon.com/2014/6/26/5842180/shovel-knight-review-pc-3ds-wii-u') + '&callback=?';
    // let html_data = '';
    // let extracted_data = '';
    //
    // $.ajax({
    //   url: url,
    //   type: "GET",
    //   dataType: "json",
    //   success: function(data) {
    //     html_data = data.contents;
    //     // console.log($('body').html(html_data));
    //     // extracted_data = extractor.lazy(html_data);
    //     // console.log(extracted_data.text());
    //   }
    // });

    // ---- END EXPERIMENT WITH GRABBING HTML FROM URL ----

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
            <Button onClick={() => signOut()} className="button" variant="raised" color="secondary">
              Sign Out
              <i className="material-icons right-icon" style={{marginLeft: 10}}>exit_to_app</i>
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
              <ListItem button onClick={() => signOut()}>
                <ListItemText primary="Sign Out" />
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
