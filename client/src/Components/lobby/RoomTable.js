import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const RoomTable = (props) => {
	const [ username ] = useState('');
	// const { rooms, currentPage, pageSize } = this.props;
	const rooms = props.rooms;
	const currentPage = props.currentPage;
	const pageSize = props.pageSize;
	return (
		<tbody>
			{rooms.slice(currentPage * pageSize, (currentPage + 1) * props.pageSize).map((room, i) => (
				<tr key={i}>
					<td>{currentPage * 10 + (i + 1)}</td>
					<td>{room.roomname}</td>
					<td>
						<Link
							to={{
								pathname: `/chatroom/${room.roomname}`,
								username: username,
								roomName: room.roomname
							}}
						>
							<Button color="success">Join</Button>
						</Link>
					</td>
				</tr>
			))}
		</tbody>
	);
};
export default RoomTable;
