import React, { Component } from 'react';
import { Button, Input, Form, FormGroup, Label, Alert, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';

class EditRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roomID: props.room._id,
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

	// handleClick = (e) => {
	// 	const found = this.props.rooms.some((el) => el.roomname === this.state.roomName);

	// 	if (this.state.roomName === '' || found === true) {
	// 		e.preventDefault();
	// 		this.setState({ visible: true });
	// 	} else {
	// 		this.props.createHandler(this.state.roomName, 'admin', this.state.status);
	// 		this.setState({ roomName: '', visible: false });
	// 		this.toggle();
	// 	}
	// };

	onSubmit(e){	
		axios.patch(`http://localhost:3100/rooms/${this.state.roomID}`, {
			roomname: this.state.roomName,
			status: this.state.status
		});
		console.log(this.state.roomName, this.state.status);
		// e.preventDefault(); // for testing
	}

	render() {
		return (
			<div className="admin-add-room">
				<Button className="btn-prime" onClick={this.toggle}>
					Edit
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add Room</ModalHeader>
					<ModalBody>
						<Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss} fade={false}>
							Make sure room is not created yet and please fill in the following:
						</Alert>

						<Form onSubmit={this.onSubmit.bind(this)}>
							<FormGroup>
								<Label for="roomName">Room name:</Label>
								<Input
									type="text"
									value={this.state.roomName}
									onChange={this.handleRoom}
								/>
							</FormGroup>

							<FormGroup>
								<Label for="status">Status</Label>

								<Input 
									type='select' 
									value={this.state.status} 
									onChange={this.handleStatus}>
									<option value="active">Active</option>
									<option value="inactive">Inactive</option>
								</Input>

								{/* <Input
									type="text"
									value={this.state.status}
									onChange={this.handleStatus}
								/> */}

							</FormGroup>

							<FormGroup>
								<Input type='submit'></Input>

								{/* <Button onClick={this.handleClick} color="primary">
									Save
								</Button> */}
								<span> </span>
								{/* <Button onClick={this.toggle} color="secondary">
									Cancel
								</Button> */}
							</FormGroup>
						</Form>
						
					</ModalBody>
				</Modal>
			</div>
		);
	}
}
export default EditRoom;
