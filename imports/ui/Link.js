import React from 'react'

import LinkList from './LinkList'
import PrivateHeader from './PrivateHeader'
import AddLink from './AddLink'
import LinkListFilters from './LinkListFilters'


export default () => {
	return ( 
		<div>
			<PrivateHeader title="ლინკების ბაზა"/>
			<div className="page-content">
				<LinkListFilters/>
				<AddLink />
				<LinkList/>
			</div>
 		</div>
	);
};

// export default class Link extends React.Component {

// 	render(){
// 		return (
// 		<div>
// 			<PrivateHeader title="Link Drive"/>
// 			<LinkList/>
// 			<AddLink />
// 		</div>
// 		);
// 	}
// }