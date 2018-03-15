import React, { Component } from 'react';
import Card from './Card';

class AddCardBase extends Component {

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
		this.state = {
			cards: [],
			count: 0
		};
		this.addCard = this.addCard.bind(this);
		this.deleteCard=this.deleteCard.bind(this);
	}

	addCard() {
		this.setState((prevState, props) => {
			return {
				cards: [...prevState.cards, { id: prevState.count }],
				count: prevState.count + 1,
			}
		});
	}

	deleteCard(id) {
		this.setState((prevState, props) => {
			const index = prevState.cards.findIndex(x => x.id === id);
			const arr = prevState.cards.slice();
			arr.splice(index, 1);
			return {
				cards: arr,
				count: prevState.count,
			}
		});
	}

	render() {
		return (
			<div>
				{
					this.state.cards.map((item) => (
						<Card key={item.id} cardId={item.id} onDelete={this.deleteCard} />
					))
				}
				<AddCardBase onClick={this.addCard}/>
			</div>
		);
	}
}

export default AddCard;