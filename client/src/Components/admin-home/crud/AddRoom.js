import React, { Component } from 'react';
import { Button, Input, FormGroup, Label, Alert, Modal, ModalHeader, ModalBody, Card } from 'reactstrap';

class AddRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roomName: '',
			status: 'active',
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
			<div className="admin-add-room">
				<Card>
					<Button className="btn-prime" onClick={this.toggle}>
						Add New Room
					</Button>
				</Card>

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add Room</ModalHeader>
					<ModalBody>
						<Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss} fade={false}>
							That room name is already taken. Please try another name.
						</Alert>
						<FormGroup>
							<Label for="roomName">Room name:</Label>
							<Input
								type="text"
								name="text"
								id="roomName"
								placeholder="Shawn Michaels' Room"
								value={this.state.roomName}
								onChange={this.handleRoom}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="username">Status</Label>
							<Input 
									type='select' 
									value={this.state.status} 
									onChange={this.handleStatus}>
									<option value="active">Active</option>
									<option value="inactive">Inactive</option>
							</Input>
						</FormGroup>

						<FormGroup>
						<Input type='submit' onClick={this.handleClick} className='submitStyle'></Input>
							{/* <Button onClick={this.handleClick} color="primary">
								Add
							</Button> */}
						</FormGroup>
						
					</ModalBody>
				</Modal>
			</div>
		);
	}
}
export default AddRoom;
