import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import './tabs.styles.css';

const Tabs = (props) => {
	return (
		<NavItem>
			<NavLink className={props.toggleClass} onClick={props.clickHandler}>
				<h3>{props.name}</h3>
			</NavLink>
		</NavItem>
	);
};

export default Tabs;
