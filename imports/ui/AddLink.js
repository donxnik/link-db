import React from 'react'
import {Meteor} from 'meteor/meteor'
import Modal from 'react-modal'

export default class AddLink extends React.Component {

		constructor(props){
			super(props);
			this.state= {
				isOpen:false,
				url:'',
				error:'',
				desc:''
			}
			
		}

		onSubmit(e){

			const url = this.refs.url.value.trim();
			const desc = this.refs.desc.value;

			e.preventDefault();

			Meteor.call('links.insert', url,desc,(err,res)=>{
				if(!err){
					this.handleModalClose();
				}
				else {
					this.setState({error:err.reason})
				}
			});
			// Links.insert({url,userId:Meteor.userId()})
			// this.refs.url.value='';
			
		}
	handleModalClose(){
		this.setState({isOpen:false,url:'',error:'',desc:''});
	}

	render(){
		return(
			<div>
			<button className="button" onClick={()=>this.setState({isOpen:true})}> + Add Link</button>
			<Modal isOpen={this.state.isOpen} 
				   contentLabel="Add Link"
				   onAfterOpen={()=> this.refs.url.focus()}
				   onRequestClose={this.handleModalClose.bind(this)}
				   className="boxed-view__box"
				   overlayClassName="boxed-view boxed-view--modal">
					<h1>ლინკის დამატება</h1>
					{this.state.error ? <p>ლინკი არასწორადაა მითითებული</p> : undefined}
				<form onSubmit ={this.onSubmit.bind(this)} className="boxed-view__form">
					<input type="text" ref="url" placeholder="URL"/>
					<input type="text" ref="desc" placeholder="აღწერა"/>
					<button className="button">დამატება</button>
				    <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>გათიშვა</button>
				</form>
			</Modal>
			</div>
		)
	}
}