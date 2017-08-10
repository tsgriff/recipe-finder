import React, { Component } from 'react';
import './about.css';

class About extends Component {
  render() {
    return (
      <section id="about">
        <div id="about-contain">
        <h1 id="about-title">About</h1>
        <h3 id="about-description">This application allows you to login using Auth0, search for recipes from the Food2Fork API, view videos from YouTube with the search term plus "recipe" appended to it and save, "favorite", any of the videos to your profile through a SQL database. <br /><br /> Further details about each recipe are available and each recipe can be added to favorites. Notes can be created about each recipe as well. These are stored in a database with each unique user, so only your notes will display when logged in.<br /><br />The frontend was built using JavaScript, React, and Redux and the backend was built with Node, Massive, Express, postgreSQL, and AuthO authentication</h3>
          <h1 id="tech-used-title">Technologies Used</h1>
          <ul id="tech-list">
            <li>JavaScript</li>
            <li>React</li>
            <li>Redux</li>
            <li>AuthO Authentication</li>
            <li>CSS</li>
            <li>Webpack</li>
            <li>Node</li>
            <li>Express</li>
            <li>Massive</li>
            <li>postgreSQL</li>
          </ul>
          <h1 id="api-list-title">APIs</h1>
          <ul id="api-list">
            <li><a href="http://food2fork.com/">Food2Fork Recipes</a></li>
            <li>YouTube</li>
          </ul>
        </div>
      </section>
    )
  }
}

export default About;
