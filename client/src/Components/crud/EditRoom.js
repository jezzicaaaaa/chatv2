import React, { Component } from 'react';
import { Button, Input, FormGroup, Label, Alert, Modal, ModalHeader, ModalBody } from 'reactstrap';
import socket from '../../socket';

class EditRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roomName: props.room.roomname,
			status: props.room.status,
			visible: false,
			modal: false
		};
	}
	onDismiss = () => {
		this.setState({ visible: false });
	};
	handleRoom = (e) => {
		this.setState({ roomName: e.target.value });
	};
	handleStatus = (e) => {
		this.setState({ status: e.target.value });
	};
	toggle = () => this.setState({ modal: !this.state.modal });
	handleClick = (e) => {
		const found = this.props.rooms.some((el) => el.roomname === this.state.roomName);

		if (this.state.roomName === '' || found === true) {
			e.preventDefault();
			this.setState({ visible: true });
		} else {
			this.props.createHandler(this.state.roomName, 'admin', this.state.status);
			this.setState({ roomName: '', visible: false });
			this.toggle();
		}
	};

	render() {
		return (
			<div class="admin-add-room">
				<Button className="btn-prime" onClick={this.toggle}>
					Edit
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add Room</ModalHeader>
					<ModalBody>
						<Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss} fade={false}>
							Make sure room is not created yet and please fill in the following:
						</Alert>
						<FormGroup>
							<Label for="roomName">Room name:</Label>
							<Input
								type="text"
								name="text"
								id="roomName"
								value={this.state.roomName}
								onChange={this.handleRoom}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="status">Status</Label>
							<select value={this.state.status} onChange={this.handleStatus}>
								<option value="active">Active</option>
								<option value="inactive">Inactive</option>
							</select>
						</FormGroup>
						<FormGroup>
							<Button onClick={this.handleClick} color="primary">
								Save
							</Button>
							<span> </span>
							<Button onClick={this.toggle} color="secondary">
								Cancel
							</Button>
						</FormGroup>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}
export default EditRoom;
