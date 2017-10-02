import React from 'react'
import {Tracker} from 'meteor/tracker'
import {Links} from './../api/links'
import {Meteor} from 'meteor/meteor'
import LinkListItem from './LinkListItem'
import {Session} from 'meteor/session'



export default class LinkList extends React.Component {

	constructor(props){
		super(props);
		Session.set('showVisible',true);
		this.state = {
			links:[]
		};
	}

	componentDidMount(){
		this.tracerTrack=Tracker.autorun(()=>{
		Meteor.subscribe('links');
		const links = Links.find({
			visible: Session.get('showVisible')
		}).fetch();
		this.setState({links});
		});
	}

	componentWillUnmount(){
		this.tracerTrack.stop();
	}

	renderLinkListItems(){

		return this.state.links.map((link)=>{
			const shortUrl = Meteor.absoluteUrl(link._id);
			return <LinkListItem key={link._id} shortUrl={shortUrl} {...link}/>
			// return <p key={link._id}>{link.url}</p>
		});
	}

	render(){
		return(
			<div>
				<div>
				{this.renderLinkListItems()}
				</div>
			</div>
		)
	}
}