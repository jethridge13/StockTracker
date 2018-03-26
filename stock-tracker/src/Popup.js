import React, { Component } from 'react';

class PopupButtonPanel extends Component {

	render() {
		return (
			<div>
				<button onClick={this.props.onOk}>OK</button>
			</div>
		);
	}
}

class Popup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: this.props.status.state,
			reason: this.props.status.reason,
			animation: 'slideInDown',
		};

		this.okHandler = this.okHandler.bind(this);
		this.onAnimationEnd = this.onAnimationEnd.bind(this);
	}

	whichTransitionEvent() {
		const el = document.createElement('fakeelement');
		const animations = {
			animation: 'animationend',
			OAnimation: 'oAnimationEnd',
			MozAnimation: 'mozAnimationEnd',
			WebkitAnimation: 'webkitAnimationEnd',
		};

		for (let t in animations) {
			if (el.style[t] !== undefined) {
				return animations[t];
			}
		}
	}

	onAnimationEnd(event) {
		// TODO Delete component from parent
		if (event.animationName === 'slideOutUp') {
			this.props.popupCloseHandler();
		}
	}

	okHandler() {
		this.setState((prevState, props) => {
			return {
				...prevState,
				animation: 'slideOutUp',
			}
		});
	}

	render() {
		const classes = `animated ${this.state.animation} ${this.state.status}`
		return (
			<div className={classes} onAnimationEnd={this.onAnimationEnd}>
				<PopupButtonPanel onOk={this.okHandler} />
			</div>
		);
	}
}

export default Popup;