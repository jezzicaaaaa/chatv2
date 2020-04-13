import React, { Component } from 'react';
import Login from './Components/login/Login';
import Header from './Components/header/Header';
import AdminHome from './Components/admin-home/AdminHome';
import Lobby from './Components/lobby/Lobby';
import Chatroom from './Components/chatroom/Chatroom';
// import EditRoom from './Components/admin-home/crud/UpdateRoom'
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom';
import { getRooms, isAuthenticated } from './repository';
import socket from './socket';
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: []
		};
	}
	createRoom = (roomname, user, status) => {
		socket.emit('create_room', roomname, user, status);
		getRooms()
			.then((rooms) => {
				this.setState({ rooms });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	refreshPage = () => {
		window.location.reload();
	};

	logOut() {
		localStorage.removeItem('x-access-token');
	}

	componentDidMount() {
		getRooms()
			.then((rooms) => {
				this.setState({ rooms });
			})
			.catch((err) => {
				console.log(err);
			});
	}
	render() {
		const { rooms } = this.state;
		return (
			<Router>
				<div>
					<Switch>
						<Route
							exact
							path="/"
							render={(props) => <Lobby {...props} createHandler={this.createRoom} rooms={rooms} />}
						/>
						<Route
							path="/admin-home"
							render={(props) => <AdminHome {...props} createHandler={this.createRoom} rooms={rooms} />}
						/>
						<Route path="/login" component={Login} />
						<Route path="/chatroom" component={Chatroom} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
