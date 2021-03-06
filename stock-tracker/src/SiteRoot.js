import React, { Component } from 'react';
import AddCard from './AddCard';
import Navbar from './Navbar';
import Footer from './Footer';

class Page extends Component {

	render() {
		return (
			<div className="content">
				<AddCard />
			</div>
		);
	}
}

class SiteRoot extends Component {

	render() {
		return [
				<Navbar key="Navbar" />,
				<Page key="Page" />,
				<Footer key="Footer" />,
		];
	}
}

export default SiteRoot;