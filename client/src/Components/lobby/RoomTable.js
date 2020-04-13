import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const RoomTable = (props) => {
	const [ username ] = useState('');
	const rooms = props.rooms.filter((room) => room.status == 'active');
	return (
		<tbody>
			{rooms.map((room, index) => {
				return (
					<tr key={index}>
						<td>{index + 1}</td>
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
				);
			})}
		</tbody>
	);
};
export default RoomTable;
