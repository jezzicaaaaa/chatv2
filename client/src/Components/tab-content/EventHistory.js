import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { getEventHistory, isAuthenticated } from '../../repository';
import { Redirect } from 'react-router-dom';

class EventHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			auth: false,
			events: []
		};
	}

	componentDidMount() {
		if (isAuthenticated())
			getEventHistory()
				.then((events) => {
					this.setState({ events, isLoaded: true, auth: true });
				})
				.catch((err) => {
					alert('User Not Authenticated');
					this.setState({ auth: false });
				});
		else {
			// alert('User Not Authenticated');
			this.setState({ auth: false });
		}
	}

	render() {
		const { error, isLoaded, events } = this.state;

		if (error) {
			return <div>Error in loading</div>;
		} else if (!isLoaded) {
			return <div>Loading ...</div>;
		} else {
			return (
				<div>
					{this.state.auth ? '' : <Redirect to="/" />}
					<Table bordered>
						<thead>
							<tr>
								<th>#</th>
								<th>Event type</th>
								<th>User</th>
								<th>Room Name</th>
								<th>Timestamp</th>
							</tr>
						</thead>
						<tbody>
							{events.map((event, index) => {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{event.event}</td>
										<td>{event.username}</td>
										<td>{event.roomname}</td>
										<td>{event.createdAt}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
			);
		}
	}
}
export default EventHistory;
