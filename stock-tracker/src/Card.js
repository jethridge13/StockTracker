import React, { Component } from 'react';
import Popup from './Popup';
import { Line } from 'react-chartjs-2';

const DEV_URL_BASE = 'http://localhost:5000';

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
		this.props.deleteHandler(id);
	}

	render() {
		// TODO Tabindex for switching between fields
		return (
			<div className="cardInputBase">
				<div className="cardInputs">
					<CardInputSettings titleHandler={this.props.titleHandler} />
					<div className="cardInputList">
						{
							this.state.inputs.map((item) => (
								<CardInputField 
								key={item.id} 
								id={item.id}
								onDelete={this.deleteInputHandler}
								changeHandler={this.props.changeHandler} />
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
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.changeHandler(this.props.id, event.target.value);
	}

	render() {
		return (
			<div>
				<input type="text"
				placeholder="Stock Ticker"
				className="animated bounceIn"
				onChange={this.handleChange}></input>

				<button 
				className="deleteCard icons-delete animated bounceIn"
				onClick={() => this.props.onDelete(this.props.id)}></button>
			</div>
		);
	}
}

class CardInputSettings extends Component {
	constructor(props) {
		super(props);
		this.titleHandler = this.titleHandler.bind(this);
	}

	titleHandler(event) {
		this.props.titleHandler(event.target.value);
	}

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
				<input type="text"
					placeholder="Card Title"
					onChange={this.titleHandler}></input>
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
	// TODO Move the delete input field handler here to delete old entries
	constructor(props) {
		super(props);
		// EXAMPLE TITLE ONLY
		const title = this.props.title;

		this.state = {
			state: 'waiting',
			title: title,
			pendingTitle: '',
			tickers: {},
			startDate: '',
			endDate: '',
		}
		this.changeHandler = this.changeHandler.bind(this);
		this.deleteHandler = this.deleteHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.titleHandler = this.titleHandler.bind(this);
		this.popupCloseHandler = this.popupCloseHandler.bind(this);
	}

	cardState() {
		if (this.state.data) {
			return <Graph title={this.state.title} data={this.state.data}/>
		} else if (this.state.state === 'loading') {
			return <LoadingCard />
		} else {
			return <CardInput 
					clickHandler={this.submitHandler}
					changeHandler={this.changeHandler}
					deleteHandler={this.deleteHandler} 
					titleHandler={this.titleHandler} />
		}
	}

	popup() {
		// TODO onClick event for when OK is clicked to update state
		// and remove popup
		if (this.state.popup) {
			return (
				<Popup 
				status={this.state.popup}
				popupCloseHandler={this.popupCloseHandler} />
			);
		}
	}

	changeHandler(id, value) {
		this.setState((prevState, props) => {
			let t = prevState.tickers;
			t[id] = value;
			return {
				...prevState,
				tickers: t,
			}
		});
	}

	deleteHandler(id) {
		this.setState((prevState, props) => {
			let prev = prevState;
			delete prev['tickers'][id];
			return {
				...prev,
			}
		});
	}

	popupCloseHandler() {
		this.setState((prevState, props) => {
			delete prevState['popup'];
			return {
				...prevState,
			}
		})
	}

	submitHandler() {
		if (!Object.keys(this.state.tickers).length > 0) {
			const warningPopup = {
				state: 'warning',
				reason: 'Not enough tickers',
			};
			this.setState((prevState, props) => {
				return {
					...prevState,
					popup: warningPopup,
				}
			});
			return;
		}
		this.setState((prevState, props) => {
			return {
				...prevState,
				state: 'loading',
				title: 'Loading...',
			}
		});

		let url = new URL(`${DEV_URL_BASE}/stocks?symbols=`);
		for (let key in this.state.tickers) {
			url += this.state.tickers[key] + ',';
		}
		fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			console.log(json);
			this.setState((prevState, props) => {
				let pendingTitle = 'New Card';
				if (prevState.pendingTitle) {
					pendingTitle = prevState.pendingTitle;
				}
				return {
					...prevState,
					data: json,
					title: pendingTitle,
				}
			});
		})
		.catch(function(error) {
			console.log('ERROR', error);
		});
	}

	titleHandler(title) {
		this.setState((prevState, props) => {
			let prev = prevState;
			prev['pendingTitle'] = title;
			return {
				...prev,
			}
		});
	}
	
	render() {
		return (
			<div className="cardBase animated zoomIn">
				{this.popup()}
				<TitleBar className="title" title={this.state.title}/>
				{this.cardState()}
				<CardControl cardId={this.props.cardId} onDelete={this.props.onDelete}/>
			</div>
		);
	}

}

export default Card;
