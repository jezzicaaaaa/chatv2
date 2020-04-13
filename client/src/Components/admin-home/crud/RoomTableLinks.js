import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import socket from '../../../socket';

const RoomTableLinks = (props) => {
	const [ username ] = useState('');

	return (
		<tbody>
			{props.rooms.map((room, index) => {
				return (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{room}</td>
						<td>
							<Link to={{ pathname: `/chatroom/${room}`, username: username, roomName: room }}>
								<Button color="success">Join</Button>
							</Link>
							<span> </span>
							<Link to={{ pathname: `/admin-home/delete/${room}`, username: username, roomName: room }}>
								<Button color="danger">Delete</Button>
							</Link>
						</td>
						
					</tr>
				);
			})}
		</tbody>
	);
};
export default RoomTableLinks;
