import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

// EXAMPLE DATA ONLY
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

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
        <Line data={data} />
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
