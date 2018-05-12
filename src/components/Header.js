import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  render() {
    return (
      <header>
          <div className='wrapper'>
            <Link to="/" className="navbar-brand">
              <h1>{ this.props.appName.toLowerCase() }</h1>
            </Link>
              {this.props.user ?
                <button onClick={this.props.logout}>Log Out</button>
                :
                <button onClick={this.props.login}>Log In</button>
              }
          </div>
      </header>
    )
  }

}

export default Header;
