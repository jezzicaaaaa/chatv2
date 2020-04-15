import React, { Component } from 'react';
import { Button, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import AddRoom from '../admin-home/crud/AddRoom';
import EditRoom from '../admin-home/crud/EditRoom';
import axios from 'axios';

class Rooms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			error: null,
			isLoaded: false,
			auth: false,
			currentPage: 0,
			pageSize: 10,
			rooms: []
		};
	}

	toggle = () => this.setState({ modal: !this.state.modal });

	handleClick(e, index) {
		e.preventDefault();
		this.setState({
			currentPage: index
		});
	};

	onDelete = roomID => {
		  axios.delete(`http://localhost:3100/rooms/${roomID}`)
		  	.then(response => {
				  console.log(response);
				  window.location.reload();
			  })
			.catch(err => {
				console.log(err);
			})
	};

	render() {
		const { currentPage, pageSize } = this.state;
		const pagesCount = Math.ceil(this.props.rooms.length / 10);
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
							<th />
						</tr>
					</thead>
					<tbody>
						{this.props.rooms.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((room, i) => (
							<tr key={i}>
								<td>{currentPage * 10 + (i + 1)}</td>
								<td>{room.roomname}</td>
								<td>{room.created}</td>
								<td>{room.edited}</td>
								<td>{room.status}</td>
								<td>
									<EditRoom room={room} rooms={this.props.rooms} />
								</td>
								<td>
									<Button color="danger" onClick={() => this.onDelete(room._id)}>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<div className="pagination-wrapper">
					<Pagination aria-label="Page navigation example">
						<PaginationItem disabled={currentPage <= 0}>
							<PaginationLink onClick={(e) => this.handleClick(e, currentPage - 1)} previous href="#" />
						</PaginationItem>

						{[ ...Array(pagesCount) ].map((page, i) => (
							<PaginationItem active={i === currentPage} key={i}>
								<PaginationLink onClick={(e) => this.handleClick(e, i)} href="#">
									{i + 1}
								</PaginationLink>
							</PaginationItem>
						))}

						<PaginationItem disabled={currentPage >= pagesCount - 1}>
							<PaginationLink onClick={(e) => this.handleClick(e, currentPage + 1)} next href="#" />
						</PaginationItem>
					</Pagination>
				</div>
			</div>
		);
	}
}
export default Rooms;