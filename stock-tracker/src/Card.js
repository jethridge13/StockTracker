import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class TitleBar extends Component {

	renderTitle() {
		if (this.props.title) {
			return (
				<span className={this.props.className}>
					{this.props.title}
				</span>
			);
		}
		return <span className={this.props.className}></span>
	}
	
	render() {
		return (
			<div>
				{this.renderTitle()}
				<button className="moveCard icons-arrows"></button>
			</div>
		);
	}

}

class Graph extends Component {
	// TODO Load card before data requested then update when data available
	constructor(props) {
		super(props);
		if (props.data) {
			this.state = {
				data: props.data,
			}
		} else {
			this.state = {};
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
				<button className="deleteCard icons-delete" onClick={() => this.props.onDelete(this.props.cardId)}></button>
			</div>
		);
	}
}

class CardInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			inputs: [],
		}
	}

	render() {
		return (
			<div className="cardInputBase">
				<div className="cardInputs">
					<input type="text"></input>
				</div>
			</div>
		);
	}
}

class CardInputField extends Component {

	render() {
		return (
			<div></div>
		);
	}
}

class Card extends Component {
	constructor(props) {
		super(props);
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
		// EXAMPLE TITLE ONLY
		const title = 'Title';
		/*
		this.state = {
			title: title,
			data: data,
		}
		*/
		this.state = {}
	}

	getGraphOrInput() {
		if (this.state.data) {
			return <Graph title={this.state.title} data={this.state.data}/>
		} else {
			return <CardInput />
		}
	}
	
	render() {
		return (
			<div className="cardBase">
				<TitleBar className="title" title={this.state.title}/>
				{this.getGraphOrInput()}
				<CardControl cardId={this.props.cardId} onDelete={this.props.onDelete}/>
			</div>
		);
	}

}

export default Card;
