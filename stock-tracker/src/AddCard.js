import React, { Component } from 'react';
import Card from './Card';

class AddCardBase extends Component {
	// https://stackoverflow.com/questions/36651583/dynamically-add-child-components-in-react

	render() {
		const classes = 'addCardBase icons-plus';
		return (
			<button className={classes} onClick={this.props.onClick}></button>
		);
	}
}

class AddCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.cards = [];
		this.state.count = 0;
	}

	addCard() {
		this.setState(this.state.cards.concat([
			{ id: this.state.count }
		]));
		this.state.count += 1;
	}

	render() {
		return (
			<div>
				{
					this.state.cards.map((item) => (
						<Card key={item.id} onClick={this.addCard()}/>
					))
				}
				<AddCardBase />
			</div>
		);
	}
}

export default AddCard;