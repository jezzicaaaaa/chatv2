import React, { Component } from 'react';
import Login from './Components/login/Login';
import Header from './Components/header/Header';
import Regular from './Components/Regular';
import Special from './Components/Special';
import Home from './Components/Home';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './repository';

class App extends Component {
	logOut() {
		localStorage.removeItem('x-access-token');
	}

	render() {
		return (
			<Router>
				<div>
					{isAuthenticated() ? (
						<div className="container-fluid container">
							<Header buttonClick={this.logOut} />
							<div className="navbar-header">
								<span className="navbar-brand">
									<Link to="/"> DevTip</Link>
								</span>
							</div>
							<ul className="nav navbar-nav">
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/tip/regular">Regular Tips</Link>
								</li>
								<li>{isAuthenticated() ? <Link to="/tip/special">Special Tips</Link> : ''}</li>
							</ul>
							<ul className="nav navbar-nav navbar-right">
								{isAuthenticated() ? (
									<li onClick={this.logOut}>
										<a href="/">Log out</a>{' '}
									</li>
								) : (
									<li>
										<Link to="/login">Log in</Link>
									</li>
								)}
							</ul>
						</div>
					) : (
						<Redirect to="/login" />
					)}
					<Route exact path="/" component={Home} />
					<Route exact path="/tip/regular" component={Regular} />
					<Route exact path="/tip/Special" component={Special} />
					<Route exact path="/login" component={Login} />
				</div>
			</Router>
		);
	}
}

export default App;
