import React from 'react';
import './header.styles.css';
const Header = (props) => {
	return (
		<nav className="admin-header">
			<p>Administrator</p>
			<button onClick={props.buttonClick}>
				<a href="/">Log out</a>
			</button>
		</nav>
	);
};

export default Header;
