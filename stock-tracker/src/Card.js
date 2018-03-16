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
		// TODO Edit options button
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

	addInputHandler() {
		this.setState((prevState, props) => {
			return {
				inputs: [...prevState.inputs, { id: prevState.count }],
				count: prevState.count + 1,
			}
		});
	}

	render() {
		// TODO Tabindex for switching between fields
		return (
			<div className="cardInputBase">
				<div className="cardInputs">
					<CardInputSettings />
					<div className="cardInputList">
						{
							this.state.inputs.map((item) => (
								<CardInputField key={item.id} />
							))
						}
					</div>
					<button className="addInputButton"
					onClick={() => this.addInputHandler()}>Add Ticker</button>
				</div>
			</div>
		);
	}
}

class CardInputField extends Component {
	// TODO Add delete button to side of input

	render() {
		return (
			<div>
				<input type="text" placeholder="Stock Ticker"></input>
				<button className="deleteCard icons-delete"></button>
			</div>
		);
	}
}

class CardInputSettings extends Component {

	render() {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth()+1;
		const yyyy = today.getFullYear();
		if (dd < 10) {
			dd = `0${dd}`
		}
		if (mm < 10) {
			mm = `0${mm}`
		}
		today = `${yyyy}-${mm}-${dd}`
		return (
			<div className="cardInputSettings">
				<label>Start Date:
					<input type="date" max={today} />
				</label>
				<label>End Date: 
					<input type="date" value={today} max={today} />
				</label>
				<button className="submitCardButton">Submit</button>
			</div>
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
		const title = this.props.title;

		this.state = {
			title: title,
		}
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
