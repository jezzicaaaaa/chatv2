import React, { Component } from 'react';
import { Table, Row, Col, Container } from 'reactstrap';
import socket from '../../socket';

import CreateRoom from './CreateRoom';
import RoomTable from './RoomTable';
import { Redirect } from 'react-router-dom';

class Lobby extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			users: []
		};
	}

	componentDidMount() {
		socket.on('rooms', (room) => {
			this.setState({ rooms: room });
		});
		socket.on('users', (user) => {
			this.setState({ users: user });
		});
	}

	render() {
		console.log(socket);
		return (
			<Container>
				<Row>
					<Col>
						<Table dark>
							<thead>
								<tr>
									<th>Room Number</th>
									<th>Room Name</th>
									<th />
								</tr>
							</thead>
							<RoomTable rooms={this.state.rooms} />
						</Table>
					</Col>
					<Col>
						<CreateRoom rooms={this.state.rooms} users={this.state.users} />
					</Col>
				</Row>
			</Container>
		);
	}
}
export default Lobby;
