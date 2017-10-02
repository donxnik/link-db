import React from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';


export default class SignUp extends React.Component {

constructor(props){
	super(props);

	this.state ={
		error: '' 
	};
}

	onSubmit(e){
		e.preventDefault();
		let email = this.refs.email.value.trim();
		let password = this.refs.password.value.trim();


		if(password.length<4){
			return this.setState({
				error:'პაროლი უნდა შეიცავდეს 4 სიმბოლოზე მეტს'
			});
		}

		Accounts.createUser({email,password}, (err) => {
			if(err){
				this.setState({error:err.reason});
			}
			else{
				Meteor.call('sendVerificationLink',(err,res) =>{
					if(err){
						this.setState({error:err.reason});
					}
					else{
						this.setState({error:''});
					}
				});
				
			}
		});

	}

	render(){
		return (
			<div className="boxed-view">
				<div className="boxed-view__box">
						<h1>Register</h1>
					{this.state.error ? <p>{this.state.error}</p> :  undefined}
					<form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
						<input type="email" ref="email" name="email" placeholder="ელ-ფოსტა"/>
						<input type="password" ref="password" name="password" placeholder="პაროლი"/>
						<button className="button">ექაუნთის შექმნა</button>
					</form>
					<Link to="/">უკვე გაქვს ექაუნთი </Link>
				</div>
			</div>

		);
	}
}