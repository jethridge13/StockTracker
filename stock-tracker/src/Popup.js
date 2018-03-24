import React, { Component } from 'react';

class Popup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: this.props.status.state,
			reason: this.props.status.reason,
		};
	}

	errorOrWarning() {
		// TODO
		if (this.state.status === 'warning') {
			return <div></div>;
		} else if (this.state.status === 'error') {
			return <div></div>;
		}
	}

	render() {
		console.log(this.state);
		return this.errorOrWarning();
	}
}

export default Popup;