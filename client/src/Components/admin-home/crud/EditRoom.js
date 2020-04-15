import React, { Component } from 'react';
import { Button, Input, Form, FormGroup, Label, Alert, Modal, ModalHeader, ModalBody } from 'reactstrap';

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

	onSubmit = () => {
		this.props.editHandler(this.state.roomName, this.state.status, this.state.roomID);
	};

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
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="roomName">Room name:</Label>
								<Input type="text" value={this.state.roomName} onChange={this.handleRoom} />
							</FormGroup>

							<FormGroup>
								<Label for="status">Status</Label>
								<Input
									type="select"
									className="submitButton"
									value={this.state.status}
									onChange={this.handleStatus}
								>
									<option value="active">Active</option>
									<option value="inactive">Inactive</option>
								</Input>
							</FormGroup>
							<FormGroup>
								<Input type="submit" className="submitStyle" />
								<span> </span>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}
export default EditRoom;
