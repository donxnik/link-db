import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router,Route,browserHistory} from 'react-router'

import SignUp from './../ui/SignUp'
import Link from './../ui/Link'
import NotFound from './../ui/NotFound'
import Login from './../ui/Login'

const unautenticatedPages = ['/','/signup'];
const authenticatedPages =['/link'];

const onEnterPublicPage = () => {
	if(Meteor.userId()){
		browserHistory.replace('/link');
	}
};

const onEnterPrivatePage = () => {
	if(!Meteor.userId()){
		browserHistory.replace('/');
	}
};

export const onAuthChange = (isAuthenticated) => {
	const pathname = browserHistory.getCurrentLocation().pathname;
	//თუ არარეგისტრირებული საიტის გვერდები შეიცავენ (რეგისტრირებუილ გვერდებს როგორიცა link ) => false
	const isUnauthenticatedPage = unautenticatedPages.includes(pathname);
	// ტუ რეგისტრირებადი საიტის /link შეიცავს რეგისტტირებულ საიტზე 
	const isAutheticatedPage = authenticatedPages.includes(pathname);


	if(isAuthenticated && isUnauthenticatedPage) {
		browserHistory.replace('/link');
	}
	else if(!isAuthenticated && isAutheticatedPage ) {
		browserHistory.replace('/');
	}

	console.log("/link ების გვერდზე",isAutheticatedPage);
	console.log("იუსერი შსულია ",isAuthenticated);
};

export const routers = (
	<Router history={browserHistory}>
		<Route path="/signup" onEnter={onEnterPublicPage} component={SignUp}/>
		<Route path="/" onEnter={onEnterPublicPage} component={Login}/>
		<Route path="/link" component={Link} onEnter={onEnterPrivatePage}/>
		<Route path="*" component={NotFound}/>
	</Router>
);
