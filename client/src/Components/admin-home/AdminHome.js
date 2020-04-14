import React, { Component } from 'react';
import Tabs from '../tabs/Tabs';
import { TabContent, TabPane, Nav } from 'reactstrap';
import EventHistory from '../tab-content/EventHistory';
import ChatHistory from '../tab-content/ChatHistory';
import Rooms from '../tab-content/Rooms';
import Header from '../header/Header';
import './admin-home.styles.css';
import { isAuthenticated } from '../../repository';

class AdminHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabNames: [ 'Rooms', 'Event History', 'Chat History' ],
			activeTab: '0'
		};
	}

	render() {
		const toggle = (index) => {
			this.setState({ activeTab: index });
		};
		return (
			<div className="admin-home">
				{isAuthenticated() ? (
					<div className="admin-home-container">
						<Header loggedin={isAuthenticated() ? true : false} logout={this.logOut} />
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
								<Rooms createHandler={this.props.createHandler} rooms={this.props.rooms} />
							</TabPane>
							<TabPane tabId="1">
								<ChatHistory />
							</TabPane>
							<TabPane tabId="2">
								<EventHistory />
							</TabPane>
							
							
						</TabContent>
					</div>
				) : (
					<h1>You don't have access.</h1>
				)}
			</div>
		);
	}
}

export default AdminHome;
