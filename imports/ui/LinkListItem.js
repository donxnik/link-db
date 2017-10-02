import React from 'react'
import Clipboard from 'clipboard'
import {Meteor} from 'meteor/meteor'
import moment from 'moment'
export default class LinkListItem extends React.Component {


	constructor(props){
		super(props);
		 this.state={
		 	justCopied:false
		 };
	}

	componentDidMount(){
		 this.clipboard = new Clipboard(this.refs.copy);

		this.clipboard.on('success',()=>{
			this.setState({justCopied:true});
			setTimeout(()=>{this.setState({justCopied:false})},1000);
		}).on('error',()=>{

		})
	}



	componentWillUnmount(){
		this.clipboard.destroy();
	}
	renderVisit(){
		let visitedMessage = null;
		let finVisit='';
		if(typeof this.props.lastVisitedAt === 'number'){
			if(moment(this.props.lastVisitedAt).fromNow().indexOf("a few seconds ago") >= 0){
				finVisit = moment(this.props.lastVisitedAt).fromNow().replace("a few seconds ago","რამოდენიმე წამის წინ");
				visitedMessage = `(ბოლო ნახვა:  ${ finVisit })`;
			}
			//a minute ago
			else if(moment(this.props.lastVisitedAt).fromNow().indexOf("minutes ago") >= 0){
				finVisit = moment(this.props.lastVisitedAt).fromNow().replace("minutes ago"," წუთის წინ");
				visitedMessage = `(ბოლო ნახვა:  ${ finVisit })`;
			}
			//hours ago
			else if(moment(this.props.lastVisitedAt).fromNow().indexOf("hours ago") >= 0){
				finVisit = moment(this.props.lastVisitedAt).fromNow().replace("hours ago"," საათის წინ");
				visitedMessage = `(ბოლო ნახვა:  ${ finVisit })`;
			}
			else if(moment(this.props.lastVisitedAt).fromNow().indexOf("an hour ago") >= 0){
				finVisit = moment(this.props.lastVisitedAt).fromNow().replace("an hour ago","რამოდენიმე საათის წინ");
				visitedMessage = `(ბოლო ნახვა:  ${ finVisit })`;
			}
			//
			else if(moment(this.props.lastVisitedAt).fromNow().indexOf("a day ago") >= 0){
				finVisit = moment(this.props.lastVisitedAt).fromNow().replace("a day ago","გუშინ");
				visitedMessage = `(ბოლო ნახვა:  ${ finVisit })`;
			}
			else if(moment(this.props.lastVisitedAt).fromNow().indexOf("days ago") >= 0){
				finVisit = moment(this.props.lastVisitedAt).fromNow().replace("days ago","დღის წინ");
				visitedMessage = `(ბოლო ნახვა:  ${ finVisit })`;
			}
			
			else {
				visitedMessage = `(ბოლო ნახვა:  ${ moment(this.props.lastVisitedAt).fromNow() })`
			}

			
		}
		return <p className="item__message"> ნანახია {this.props.visitedCount}/ჯერ  {visitedMessage}</p>
	}
	render(){
		return(
			<div className="item">
			<h2>{this.props.url}</h2>
			<h3 className="item--desc">{this.props.desc}</h3>
			{this.renderVisit()}
					{/* this.pr0ps.sh0rtUrl bugs l0cal h0st : 192.68....*/}
			<a className="button button--pill button--link" href={this.props.url} target="_blink">
			Visit
			</a>	
			<button className="button button--pill" ref="copy" data-clipboard-text={this.props.url}>{this.state.justCopied ?  'Copied' : 'Copy'}</button>
			<button className="button button--pill" onClick={() => Meteor.call('links.setVisibility',this.props._id,!this.props.visible)}>{this.props.visible ? 'Hide' : 'Unhide'}</button>
			<button className="button button--pill" onClick={()=>Meteor.call('links.delete',this.props._id)}>Delete</button>
			</div>
		);
	}
}