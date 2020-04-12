import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../repository';
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
		login(this.state).then((token) => (window.location = '/admin-home')).catch((err) => alert(err));
	};

	render() {
		return (
			<div className="login">
				<div className="login-card">
					<div className="login-container">
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
							<button className="btn-prime" type="submit">
								Submit
							</button>
							<p>or</p>
							<Link to="/lobby">Continue as guest</Link>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
export default Login;
