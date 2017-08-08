import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './nav.css';

class Nav extends Component {
  render() {
    return (
      <section id="Nav">
        <div className="navbar-contain">
          <ul id="nav-links">
            <Link className="link-text" to="/"><li>Home</li></Link>
            <Link className="link-text" to="/about"><li>About</li></Link>
            <li>Profile</li>
            <li>Login</li>
          </ul>
        </div>
      </section>
    )
  }
}

export default Nav;
