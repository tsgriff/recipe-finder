import React, { Component } from 'react';
import './nav.css';

class Nav extends Component {
  render() {
    return (
      <section id="Nav">
        <div className="navbar-contain">
          <ul id="nav-links">
            <li>Home</li>
            <li>About</li>
            <li>Profile</li>
            <li>Login</li>
          </ul>
        </div>
      </section>
    )
  }
}

export default Nav;
