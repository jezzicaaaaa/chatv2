import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { getRooms, isAuthenticated } from '../../repository';
import socket from '../../socket';
import AddRoom from '../crud/AddRoom';
import EditRoom from '../crud/EditRoom';
import RoomTableLinks from '../crud/RoomTableLinks';

class Rooms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			auth: false,
			isLoaded: false
		};
	}
	toggle = () => this.setState({ modal: !this.state.modal });

	render() {
		return (
			<div>
				<AddRoom createHandler={this.props.createHandler} rooms={this.props.rooms} />
				<hr />
				<Table dark>
					<thead>
						<tr>
							<th>#</th>
							<th>Room Name</th>
							<th>Created Date</th>
							<th>Edited Date</th>
							<th>Status</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{this.props.rooms.map((room, index) => {
							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{room.roomname}</td>
									<td>{room.created}</td>
									<td>{room.edited}</td>
									<td>{room.status}</td>
									<td>
										<EditRoom room={room} rooms={this.props.rooms} />
										<button>Delete</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}
export default Rooms;

// <RoomTableLinks rooms={this.state.rooms} />
