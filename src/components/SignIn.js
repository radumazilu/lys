import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../actions/index";
import PropTypes from "prop-types";

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
      <div className="row social-signin-container">
        <i className="google icon"></i>
        <div className="col s10 offset-s1 center-align">
          <h4 id="sign-in-header">Sign In to start</h4>
          <a href="#" className="social-signin" onClick={this.props.signIn}>
            <i className="fa fa-google social-signin-icon" />
            Sign In With Google
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signIn })(Signin);
