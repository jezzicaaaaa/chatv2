import React, { Component } from 'react';
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { getEventHistory, isAuthenticated } from '../../repository';

class EventHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			auth: false,
			events: [],
			currentPage: 0,
			pageSize: 10,
			pagesCount: 0
		};
	}

	handleClick(e, index) {
		e.preventDefault();
		this.setState({
			currentPage: index
		});
	}
	componentDidMount() {
		if (isAuthenticated())
			getEventHistory()
				.then((events) => {
					const count = Math.ceil(events.length / 10);
					this.setState({ events, isLoaded: true, auth: true, pagesCount: count });
				})
				.catch((err) => {
					alert('User Not Authenticated');
					this.setState({ auth: false });
				});
		else {
			// alert('User Not Authenticated');
			this.setState({ auth: false });
		}
	}

	render() {
		const { error, isLoaded, events, currentPage, pageSize, pagesCount } = this.state;

		if (error) {
			return <div>Error in loading</div>;
		} else if (!isLoaded) {
			return <div>Loading ...</div>;
		} else {
			return (
				<div>
					<Table dark hover borderless>
						<thead>
							<tr>
								<th>#</th>
								<th>Event type</th>
								<th>User</th>
								<th>Room Name</th>
								<th>Timestamp</th>
							</tr>
						</thead>
						<tbody>
							{events.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((data, i) => (
								<tr key={i}>
									<td>{currentPage * 10 + (i + 1)}</td>
									<td>{data.event}</td>
									<td>{data.username}</td>
									<td>{data.roomname}</td>
									<td>{data.createdAt}</td>
								</tr>
							))}
						</tbody>
					</Table>
					<div className="pagination-wrapper">
						<Pagination aria-label="Page navigation example">
							<PaginationItem disabled={currentPage <= 0}>
								<PaginationLink
									onClick={(e) => this.handleClick(e, currentPage - 1)}
									previous
									href="#"
								/>
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
}
export default EventHistory;
