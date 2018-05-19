import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../actions/index";
import PropTypes from "prop-types";

import FaGoogle from 'react-icons/lib/fa/google';

// Material UI Next v1.0.0-rc.0
import Paper from '@material-ui/core/Paper';

class Signin extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      this.context.router.history.push("/app");
    }
  }

  render() {
    return (
      <div className="signin-container">
        <Paper elevation={2} className="signin-paper">
          <h4 id="sign-in-header">Welcome to Lys</h4>
          <p>Listen to the world's information</p>
          <h5>Sign in to continue</h5>
          <a href="#" className="social-signin" onClick={this.props.signIn}>
            <i className="fa fa-google social-signin-icon" />
            <FaGoogle style={{width: 30, height: 30}} />
          </a>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signIn })(Signin);
