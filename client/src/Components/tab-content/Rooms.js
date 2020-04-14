import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { getRooms, isAuthenticated } from '../../repository';
import socket from '../../socket';
import AddRoom from '../crud/AddRoom';
import EditRoom from '../crud/EditRoom';
import Axios from 'axios';



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

	delData1 = roomID => {
		const requestOptions = {
		  method: 'DELETE'
		};
		fetch(`http://localhost:3100/rooms/${roomID}`, requestOptions).then((response) => {
		  return response.json();
		}).then((result) => {
		  console.log('deleted');
		});
	  }

	  delData2(roomID) {
		  Axios.delete(`http://localhost:3100/rooms/${roomID}`, Rooms)
		  	.then((Rooms) => {
				  console.log(Rooms);  
			  })
			.catch((err) => {
				console.log(err);
			})
	  }
	  
	  

	render() {
		return (
			<div>
				<AddRoom createHandler={this.props.createHandler} rooms={this.props.rooms} />
				<Table dark hover borderless>
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
										<Button color='danger' onClick={() => this.delData2(room._id)}>Delete</Button>
										{/* <p>{room._id}</p> */}
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
