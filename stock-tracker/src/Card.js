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
		this.deleteInputHandler = this.deleteInputHandler.bind(this);
	}

	addInputHandler() {
		this.setState((prevState, props) => {
			return {
				inputs: [...prevState.inputs, { id: prevState.count }],
				count: prevState.count + 1,
			}
		});
	}

	deleteInputHandler(id) {
		this.setState((prevState, props) => {
			const index = prevState.inputs.findIndex(x => x.id === id);
			const arr = prevState.inputs.slice();
			arr.splice(index, 1);
			return {
				inputs: arr,
				count: prevState.count,
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
								<CardInputField 
								key={item.id} 
								id={item.id}
								onDelete={this.deleteInputHandler} />
							))
						}
					</div>
					<button className="addInputButton"
					onClick={() => this.addInputHandler()}>Add Ticker</button>
					<button className="submitCardButton"
					onClick={this.props.clickHandler}>Submit</button>
				</div>
			</div>
		);
	}
}

class CardInputField extends Component {

	render() {
		return (
			<div>
				<input type="text" placeholder="Stock Ticker"
				className="animated bounceIn"></input>
				<button 
				className="deleteCard icons-delete animated bounceIn"
				onClick={() => this.props.onDelete(this.props.id)}></button>
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
					<input type="date" defaultValue={today} max={today} />
				</label>
			</div>
		);
	}
}

class LoadingCard extends Component {

	render() {
		return (
			<div className="cardInputBase">
				<img src={require("../images/loading.gif")} alt="Loading..." />
			</div>
		);
	}
}

class Card extends Component {
	constructor(props) {
		super(props);
		// EXAMPLE DATA ONLY
		const data = {
			"labels": [
				"2018-02-20",
				"2018-02-21",
				"2018-02-22",
				"2018-02-23",
				"2018-02-26",
				"2018-02-27",
				"2018-02-28",
				"2018-03-01",
				"2018-03-02",
				"2018-03-05",
				"2018-03-06",
				"2018-03-07",
				"2018-03-08",
				"2018-03-09",
				"2018-03-12",
				"2018-03-13",
				"2018-03-14",
				"2018-03-15",
				"2018-03-16"
			],
			"datasets": [
				{
					"label": "GOOG",
					"borderCapStyle": "butt",
					"lineTension": 0.05,
					"pointHoverRadius": 5,
					"borderJoinStyle": "miter",
					"backgroundColor": "rgba(75,192,192,0.4)",
					"pointHitRadius": 10,
					"pointHoverBorderColor": "rgba(220,220,220,1)",
					"pointHoverBorderWidth": 2,
					"pointBorderColor": "rgba(75,192,192,1)",
					"pointBorderWidth": 1,
					"pointRadius": 1,
					"pointBackgroundColor": "#fff",
					"fill": false,
					"pointHoverBackgroundColor": "rgba(75,192,192,1)",
					"data": [
						1102.46,
						1111.34,
						1106.63,
						1126.79,
						1143.75,
						1118.29,
						1104.73,
						1069.52,
						1078.92,
						1090.93,
						1095.06,
						1109.64,
						1126,
						1160.04,
						1164.5,
						1138.17,
						1149.49,
						1149.58,
						1135.73
					],
					"borderDash": [],
					"borderColor": "rgba(75,192,192,1)",
					"borderDashOffset": 0.0
				},
				{
					"label": "TSLA",
					"borderCapStyle": "butt",
					"lineTension": 0.05,
					"pointHoverRadius": 5,
					"borderJoinStyle": "miter",
					"backgroundColor": "rgba(75,192,192,0.4)",
					"pointHitRadius": 10,
					"pointHoverBorderColor": "rgba(220,220,220,1)",
					"pointHoverBorderWidth": 2,
					"pointBorderColor": "rgba(75,192,192,1)",
					"pointBorderWidth": 1,
					"pointRadius": 1,
					"pointBackgroundColor": "#fff",
					"fill": false,
					"pointHoverBackgroundColor": "rgba(75,192,192,1)",
					"data": [
						334.77,
						333.3,
						346.17,
						352.05,
						357.42,
						350.99,
						343.06,
						330.93,
						335.12,
						333.35,
						328.2,
						332.3,
						329.1,
						327.17,
						345.51,
						341.84,
						326.63,
						325.6,
						321.35
					],
					"borderDash": [],
					"borderColor": "rgba(75,192,192,1)",
					"borderDashOffset": 0.0
				}
			]
		};
		// EXAMPLE TITLE ONLY
		const title = this.props.title;

		this.state = {
			state: 'waiting',
			title: title,
		}
		this.submitHandler = this.submitHandler.bind(this);
	}

	getGraphOrInput() {
		if (this.state.data) {
			return <Graph title={this.state.title} data={this.state.data}/>
		} else if (this.state.state === 'loading') {
			return <LoadingCard />
		} else {
			return <CardInput clickHandler={this.submitHandler} />
		}
	}

	submitHandler(inputs) {
		alert(inputs);
		this.setState((prevState, props) => {
			return {
				state: 'loading',
				title: 'Loading...',
			}
		});
	}
	
	render() {
		return (
			<div className="cardBase animated zoomIn">
				<TitleBar className="title" title={this.state.title}/>
				{this.getGraphOrInput()}
				<CardControl cardId={this.props.cardId} onDelete={this.props.onDelete}/>
			</div>
		);
	}

}

export default Card;
