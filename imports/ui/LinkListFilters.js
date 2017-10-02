import React from 'react'
import {Session} from 'meteor/session'
import {Tracker} from 'meteor/tracker'

export default () => {
	return (
		<div>
			<label className="checkbox">
			 <input className="checkbox__box" type="checkbox" onChange={(e)=>{
			 	Session.set('showVisible', !e.target.checked);
			 }}/>
			 დაფარული ლინკების ჩვენება
			</label>
		</div>
	);
};

