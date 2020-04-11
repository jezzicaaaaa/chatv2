import React, { Component, useState } from 'react';
import Tabs from './tabs/Tabs';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabNames: [ 'Event History', 'Chat History', 'Rooms' ],
			activeTab: '0'
		};
	}

	render() {
		const toggle = (index) => {
			this.setState({ activeTab: index }, console.log(this.state.activeTab));
		};
		return (
			<div>
				<Nav tabs>
					{this.state.tabNames.map((tab, index) => (
						<Tabs
							index={index}
							key={index}
							toggleClass={this.state.activeTab == index ? 'active' : ''}
							name={tab}
							clickHandler={() => toggle(`${index}`)}
						/>
					))}
				</Nav>
				<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId="0">Tab 1 Content</TabPane>
					<TabPane tabId="1">Tab 2 Content</TabPane>
					<TabPane tabId="2">Tab 3 Content</TabPane>
				</TabContent>
			</div>
		);
	}
}

export default Home;
