import React, { Component } from 'react';
import Login from './Components/login/Login';
import Header from './Components/header/Header';
import AdminHome from './Components/admin-home/AdminHome';
import Lobby from './Components/lobby/Lobby';
import Chatroom from './Components/chatroom/Chatroom';
// import EditRoom from './Components/admin-home/crud/UpdateRoom'
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom';
import { isAuthenticated } from './repository';

class App extends Component {
	logOut() {
		localStorage.removeItem('x-access-token');
	}

	render() {
		return (
			<Router>
				<div>
					<Header loggedin={isAuthenticated() ? true : false} logout={this.logOut} />
					<Switch>
						<Route exact path="/" component={Lobby} />
						<Route path="/lobby" component={Lobby} />
						<Route path="/login" component={Login} />
						<Route path="/admin-home" component={AdminHome} />
						{/* <Route path="/admin-home/update/:id" component={EditRoom} /> */}
						<Route path="/chatroom" component={Chatroom} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
