import React from 'react';
import { NavItem, NavLink } from 'reactstrap';

const Tabs = (props) => {
	return (
		<NavItem className='navStyle2'>
			<NavLink className={props.toggleClass} onClick={props.clickHandler}>
				<h3>{props.name}</h3>
			</NavLink>
		</NavItem>
	);
};

export default Tabs;
