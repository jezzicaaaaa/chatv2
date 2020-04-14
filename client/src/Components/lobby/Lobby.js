import React, { Component } from 'react';
import { Table, Pagination, PaginationItem, PaginationLink, Container, Button } from 'reactstrap';
import socket from '../../socket';
import Header from './../header/Header';
import RoomTable from './RoomTable';

class Lobby extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			rooms: [],
			currentPage: 0,
			pageSize: 10
		};
	}

	handleClick(e, index) {
		e.preventDefault();
		this.setState({
			currentPage: index
		});
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

	refreshPage() {
		window.location.reload();
	}

	render() {
		const { currentPage, pageSize } = this.state;
		const rooms = this.props.rooms.filter((room) => room.status === 'active');
		const pagesCount = Math.ceil(rooms.length / 10);

		return (
			<Container>
				<Header />

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
					<RoomTable currentPage={currentPage} pageSize={pageSize} rooms={rooms} />
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
			</Container>
		);
	}
}
export default Lobby;
// <Col>
// 	<CreateRoom rooms={this.props.rooms} users={this.state.users} />
// </Col>
