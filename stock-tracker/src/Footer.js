import React, { Component } from 'react';

class Footer extends Component {

	copyright() {
		const date = new Date();
		return `©${date.getFullYear()} Joshua Ethridge`;
	}
	
	render() {
		return (
			<footer className="footer">
				<div className="copyright">{this.copyright()}</div>
			</footer>
		);
	}
}

export default Footer;