import React, { Component } from 'react';
import './App.css';
import './Card.css';

class TitleBar extends Component {
  
  render() {
    return (
      <div>
        <span className={this.props.className}>
          {this.props.title}
        </span>
        <button id="moveCard">Move</button>
      </div>
    );
  }

}

class Graph extends Component {

  render() {
    return (
      <div className="graph"></div>
    );
  }
}

class CardControl extends Component {

  render() {
    /* TODO Button Functionality */
    return (
      <div className="cardControlPanel">
        <button>Update</button>
        <button>Enable Live Feed</button>
        <button>Delete</button>
      </div>
    );
  }
}

class Card extends Component {
  
  render() {
    let title = 'Title';
    return (
      <div className="cardBase">
        <TitleBar className="title" title={title}/>
        <Graph />
        <CardControl />
      </div>
    );
  }

}

export default Card;
