import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { getChatHistory, isAuthenticated } from '../../repository';
import { Redirect } from 'react-router-dom';

class ChatHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			chats: []
		};
	}

	componentDidMount() {
		if (isAuthenticated())
			getChatHistory()
				.then((chats) => {
					this.setState({ chats, isLoaded: true });
				})
				.catch((err) => {
					alert('User Not Authenticated');
					this.setState({ auth: false });
				});
		else {
			alert('User Not Authenticated');
			this.setState({ auth: false });
		}
	}

	render() {
		const { error, isLoaded, chats } = this.state;

		if (error) {
			return <div>Error in loading</div>;
		} else if (!isLoaded) {
			return <div>Loading ...</div>;
		} else {
			return (
				<div>
					<Table bordered>
						<thead>
							<tr>
								<th>#</th>
								<th>Room name</th>
								<th>User</th>
								<th>Message</th>
								<th>Timestamp</th>
							</tr>
						</thead>
						<tbody>
							{chats.map((message, index) => {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{message.roomname}</td>
										<td>{message.sender}</td>
										<td>{message.message}</td>
										<td>{message.createdAt}</td>
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
export default ChatHistory;
