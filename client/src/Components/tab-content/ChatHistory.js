import React, { Component } from 'react';
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { getChatHistory, isAuthenticated } from '../../repository';

class ChatHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			auth: false,
			chats: [],
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
			getChatHistory()
				.then((chats) => {
					const count = Math.ceil(chats.length / 10);
					this.setState({ chats, isLoaded: true, auth: true, pagesCount: count });
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
		const { error, isLoaded, chats, currentPage, pageSize, pagesCount } = this.state;

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
								<th>Room name</th>
								<th>User</th>
								<th>Message</th>
								<th>Timestamp</th>
							</tr>
						</thead>
						<tbody>
							{chats.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((data, i) => (
								<tr key={i}>
									<td>{currentPage * 10 + (i + 1)}</td>
									<td>{data.roomname}</td>
									<td>{data.sender}</td>
									<td>{data.message}</td>
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

export default ChatHistory;
