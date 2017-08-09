import React, { Component } from 'react';
import './notes.css';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: ''
    }

  this.handleNotes = this.handleNotes.bind(this);

  }

  handleNotes(event) {
    this.setState({
      notes: event.target.value,
    })
  }

  render() {
    return (
      <section id="notes">
        <div id="notes-contain"><h1>{this.state.notes}</h1>
          <textarea id="notes-input" placeholder="Save directions, modify ingredients and/or instructions, etc." onChange={this.handleNotes}></textarea>
        </div>
        <div id="notes-button-contain">
          <button id="notes-button">Submit</button>
        </div>
      </section>
    )
  }
}

export default Notes;
