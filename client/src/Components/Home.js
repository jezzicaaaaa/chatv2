import React, { Component } from 'react';
import Tabs from './tabs/Tabs';
import { TabContent, TabPane, Nav } from 'reactstrap';
import EventHistory from './tab-content/EventHistory';
import ChatHistory from './tab-content/ChatHistory';
import Rooms from './tab-content/Rooms';

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
			<div className="admin-home">
				<div className="admin-home-container">
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
						<TabPane tabId="0">
							<EventHistory />
						</TabPane>
						<TabPane tabId="1">
							<ChatHistory />
						</TabPane>
						<TabPane tabId="2">
							<Rooms />
						</TabPane>
					</TabContent>
				</div>
			</div>
		);
	}
}

export default Home;
