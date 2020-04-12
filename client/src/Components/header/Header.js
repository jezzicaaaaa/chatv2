import React from 'react';
import './header.styles.css';
import { Link } from 'react-router-dom';
const Header = (props) => {
	return (
		<nav className="admin-header">
			{props.loggedin ? (
				<div>
					<p>Administrator</p>
					<button className="btn-prime" onClick={props.logout}>
						<a href="/">Log out</a>
					</button>
				</div>
			) : (
				<button className="btn-prime">
					<Link to="/login">Log in</Link>
				</button>
			)}
		</nav>
	);
};

export default Header;
