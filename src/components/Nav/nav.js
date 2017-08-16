import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './nav.css';
import { connect } from 'react-redux';

// USER INFO FOR LOGIN/LOGOUT TOGGLE //

import { getUserInfo } from '../../ducks/user';

class Nav extends Component {

  componentDidMount() {
    this.props.getUserInfo()
  }

  render() {

    const logIn = (
      <a className="link-text" href="/auth"><li>Login</li></a>
      )

    const logOut = (
      <a className="link-text" href="/auth/logout"><li>Logout</li></a>
    )

    return (
      <section id="Nav">
        <div className="navbar-contain">
          <ul id="nav-links">
            <Link className="link-text" to="/"><li>Home</li></Link>
            <Link className="link-text" to="/about"><li>About</li></Link>
            {this.props.userInfo ? <Link className="link-text" to="/profile"><li>Profile</li></Link> : null }
            {!this.props.userInfo ? logIn : logOut}
          </ul>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
    return {
      userInfo: state.userReducer.userData
    }
  }

export default connect(mapStateToProps, {getUserInfo})(Nav);
