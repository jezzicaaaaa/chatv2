import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

const Tabs = (props) => {
	const index = props.index;
	return (
		<NavItem>
			<NavLink className={props.toggleClass} onClick={props.clickHandler}>
				{props.name}
			</NavLink>
		</NavItem>
	);
};

export default Tabs;