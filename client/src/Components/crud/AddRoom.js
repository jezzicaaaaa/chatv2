import React, { Component } from 'react';
import { Button, Input, FormGroup, Label, Alert } from 'reactstrap';
import socket from '../../socket';

class AddRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roomName: '',
			status: 'active',
			visible: false
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

	handleClick = (e) => {
		const found = this.props.rooms.some((el) => el.roomname === this.state.roomName);

		if (this.state.roomName === '' || found === true) {
			e.preventDefault();
			this.setState({ visible: true });
		} else {
			this.props.createHandler(this.state.roomName, 'admin');
			this.setState({ roomName: '', visible: false });
		}
	};

	render() {
		return (
			<React.Fragment>
				<Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss} fade={false}>
					Make sure room is not created yet and please fill in the following:
				</Alert>
				<FormGroup>
					<Label for="roomName">Room name:</Label>
					<Input
						type="text"
						name="text"
						id="roomName"
						placeholder="bbbrrROOM"
						value={this.state.roomName}
						onChange={this.handleRoom}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="username">Status</Label>
					<select value={this.state.status} onChange={this.handleStatus}>
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
					</select>
				</FormGroup>
				<FormGroup>
					<Button onClick={this.handleClick} color="primary">
						Add
					</Button>
				</FormGroup>
			</React.Fragment>
		);
	}
}
export default AddRoom;
