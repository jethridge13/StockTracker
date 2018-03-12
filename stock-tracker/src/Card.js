import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class TitleBar extends Component {
	
	render() {
		return (
			<div>
				<span className={this.props.className}>
					{this.props.title}
				</span>
				<button id="moveCard" className="icons-arrows"></button>
			</div>
		);
	}

}

class Graph extends Component {
	// TODO Load card before data requested then update when data available
	constructor(props) {
		super(props);
		this.state = {}
		if (props.data) {
			this.state.data = props.data;
		} else {
			this.state.data = null;
		}
	}

	render() {
		return (
			<div className="graph">
				<Line data={this.state.data} />
			</div>
		);
	}
}

class CardControl extends Component {

	render() {
		/* TODO Button Functionality */
		return (
			<div className="cardControlPanel">
				<button className="icons-refresh"></button>
				<button className="icons-documents"></button>
				<button className="icons-delete"></button>
			</div>
		);
	}
}

class Card extends Component {
	
	render() {
		let title = 'Title';
		// EXAMPLE DATA ONLY
		const data = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
				{
					label: 'My First dataset',
					fill: false,
					lineTension: 0.05,
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
		return (
			<div className="cardBase">
				<TitleBar className="title" title={title}/>
				<Graph title={title} data={data}/>
				<CardControl />
			</div>
		);
	}

}

export default Card;
