import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { getChatHistory, isAuthenticated } from '../../repository';
import socket from '../../socket';
import AddRoom from '../admin-home/crud/AddRoom';
import RoomTableLinks from '../admin-home/crud/RoomTableLinks';

class Rooms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			chats: [],
			rooms: []
		};
	}
	toggle = () => this.setState({ modal: !this.state.modal });

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
			this.setState({ auth: false });
		}
		socket.on('rooms', (room) => {
			this.setState({ rooms: room });
		});
	}
	render() {
		return (
			<div>
				<br />

				<button className="btn-prime" onClick={this.toggle}>
					Add New Room
				</button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add Room</ModalHeader>
					<ModalBody>
						<AddRoom rooms={this.state.rooms} users={this.state.users} />
					</ModalBody>
				</Modal>
				{/* <Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add Room</ModalHeader>
					<ModalBody>
						<label>Room Name</label>
						<input type="text" />
						<br />
						<label>Status</label>
						<input type="text" />
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.toggle}>
							Save
						</Button>{' '}
						<Button color="secondary" onClick={this.toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal> */}
				<hr />
				<Table dark>
					<thead>
						<tr>
							<th>Room Number</th>
							<th>Room Name</th>
							<th />
						</tr>
					</thead>
					<RoomTableLinks rooms={this.state.rooms} />
				</Table>
			</div>
		);
	}
}
export default Rooms;
