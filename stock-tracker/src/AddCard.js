import React, { Component } from 'react';
import Card from './Card';
import {Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

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
			count: 0,
			currentBreakpoint: 'lg',
			compactType: 'vertical',
			mounted: false,
			layouts: { lg: this.props.initialLayout },
		};
		this.addCard = this.addCard.bind(this);
		this.deleteCard=this.deleteCard.bind(this);
	}
	// Begin ResponsiveGridLayout functions
	static defaultProps = {
		className: 'layout',
		breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
		cols: {lg:3, md:2, sm: 1, xs: 1, xxs: 1},
		rowHeight: 400,
		onLayoutChange: function() {},
		initialLayout: {},
	}

	componentDidMount() {
		this.setState({ mounted: true });
	}

	onBreakpointChange = breakpoint => {
		console.log(`${breakpoint}: ${this.props.cols[breakpoint]}`)
		this.setState({
			currentBreakpoint: breakpoint
		});
	};

	onCompactTypeChange = () => {
		const { compactType: oldCompactType } = this.state;
		const compactType = 
			oldCompactType === 'horizontal' ?
			'vertical' : 
			oldCompactType === 'vertical' ? null : 'horizontal';
		this.setState({ compactType });
	};

	onLayoutChange = (layout, layouts) => {
		this.props.onLayoutChange(layout, layouts);
	};

	// End ResponsiveGridLayout functions

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
				<ResponsiveGridLayout {...this.props}
					onBreakpointChange={this.onBreakpointChange}
					measureBeforeMount={false}
					compactType={this.state.compactType}>
					{
						this.state.cards.map((item) => (
							<Card 
							key={item.id} 
							cardId={item.id} 
							title="Add Card"
							onDelete={this.deleteCard} 
							w={1} 
							h={1}
							className={'react-draggable'} />
						))
					}
				</ResponsiveGridLayout>
				<AddCardBase onClick={this.addCard}/>
			</div>
		);
	}
}

export default AddCard;