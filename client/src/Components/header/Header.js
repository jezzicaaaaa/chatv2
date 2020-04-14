import React from 'react';
import './header.styles.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const Header = (props) => {
	return (
		<nav className="admin-header">
			{props.loggedin ? (
				<div>
					<p>Administrator</p>
					<Button className="btn-prime" onClick={props.logout}>
						<a href="/">Log out</a>
					</Button>
				</div>
			) : (
				<Button className="btn-prime">
					<Link to="/login">Log in</Link>
				</Button>
			)}
		</nav>
	);
};

export default Header;
