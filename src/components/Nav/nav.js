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
            <Link className="link-text" to="/profile"><li>Profile</li></Link>
            <a className="link-text" href="/auth"><li>Login</li></a>
          </ul>
        </div>
      </section>
    )
  }
}

export default Nav;
