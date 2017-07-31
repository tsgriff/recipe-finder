import React, { Component } from 'react';
import './loading.css';
import loader from './Wedges.svg';

class Loading extends Component {
  render() {
    return (
      <section id="loading-screen">
        <h1>Loading...</h1>
        <div id="icon"><img src={loader} alt="" /></div>
      </section>
    )
  }
}

export default Loading
