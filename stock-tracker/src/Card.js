import React, { Component } from 'react';

class TitleBar extends Component {
  
  render() {
    return (
      <div>
        <span className={this.props.className}>
          {this.props.title}
        </span>
        <button id="moveCard" className="cardIcons-arrows"></button>
      </div>
    );
  }

}

class Graph extends Component {

  render() {
    return (
      <div className="graph">
        <canvas id={this.props.title}></canvas>
      </div>
    );
  }
}

class CardControl extends Component {

  render() {
    /* TODO Button Functionality */
    return (
      <div className="cardControlPanel">
        <button className="cardIcons-refresh"></button>
        <button className="cardIcons-documents"></button>
        <button className="cardIcons-delete"></button>
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
        <Graph title={title}/>
        <CardControl />
      </div>
    );
  }

}

export default Card;
