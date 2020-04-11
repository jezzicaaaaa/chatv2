import React, { Component } from 'react';
import { login } from '../../repository';
import { Card, Container } from 'reactstrap';
import './login.styles.css';

class Login extends Component {
	constructor() {
		super();
		this.state = { username: '', password: '' };
	}

	handleInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	submitLogin = (event) => {
		event.preventDefault();
		login(this.state).then((token) => (window.location = '/')).catch((err) => alert(err));
	};

	render() {
		return (
			<div className="login">
				<div className="login-card">
					<h1>Login</h1>
					<form className="login-form" onSubmit={this.submitLogin}>
						<input
							type="text"
							className="form-control"
							name="username"
							placeholder="Username"
							onChange={this.handleInputChange}
						/>
						<input
							type="password"
							className="form-control"
							name="password"
							onChange={this.handleInputChange}
						/>
						<button type="submit" className="btn btn-default">
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	}
}
export default Login;
