import React from 'react';
import {Link} from 'react-router'
export default () => {
	return (
		<div className="boxed-view">
			<div className="boxed-view__box">
				<h1>გვერდი არ მოიძებნა</h1>
				<Link className="button button--link" to="/">მთავარი გვერდი</Link>
			</div>
		</div>
		
		);

}