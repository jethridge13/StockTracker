import React, { Component } from 'react';
import './App.css';
import './Card.css';

class Title extends Component {
  
  render() {
    return (
      <div className={this.props.className}>
        {this.props.title}
      </div>
    );
  }

}

class Card extends Component {
  
  render() {
    let title = 'Title';
    return (
      <div className="cardBase">
        <Title className="title" title={title}/>
      </div>
    );
  }

}

export default Card;
