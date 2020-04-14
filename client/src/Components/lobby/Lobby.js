import React, { Component } from 'react';
import { Table, Row, Col, Container, Button } from 'reactstrap';
import socket from '../../socket';
import Header from './../header/Header';
import CreateRoom from './CreateRoom';
import RoomTable from './RoomTable';
import { Redirect } from 'react-router-dom';

class Lobby extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			rooms: []
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.rooms !== this.props.rooms) {
			this.setState({
				rooms: this.props.rooms
			});
		}
	}

	componentDidMount() {
		socket.on('users', (user) => {
			this.setState({ users: user });
		});
	}

	render() {
		return (
			<Container>
				<Header />
				<Row>
					<Col>
						<Table dark hover borderless>
							<thead>
								<tr>
									<th>Room Number</th>
									<th>Room Name</th>
									<th>
										<Button onClick={this.refreshPage}>Refresh Rooms</Button>
									</th>
								</tr>
							</thead>
							<RoomTable rooms={this.props.rooms} />
						</Table>
					</Col>
				</Row>
			</Container>
		);
	}
}
export default Lobby;
// <Col>
// 	<CreateRoom rooms={this.props.rooms} users={this.state.users} />
// </Col>
