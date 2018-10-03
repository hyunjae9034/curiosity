import React, { Component } from 'react';
import firebase, { database } from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Main from '../Main/Main.jsx';
import QuestionList from '../Question/QuestionList.jsx';
import { Query } from 'react-apollo';
import { checkUserEmail } from '../../queries/queries.js';
import { Redirect } from 'react-router-dom';
import { timingSafeEqual } from 'crypto';

firebase.initializeApp({
	apiKey: 'AIzaSyBF_AKIaEMjjU8E1ZLLjZXKTxykxhKjUG8',
	authDomain: 'curiosity-a9199.firebaseapp.com'
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSignedIn: true,
			didrun: false,
			email: '',
			userId: ''
		};
		// this.finishRegistration = this.finishRegistration.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}
	uiConfig = {
		signInFlow: 'popup',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			firebase.auth.TwitterAuthProvider.PROVIDER_ID,
			firebase.auth.GithubAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false
		}
	};
	componentDidMount = () => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log('THIS IS THE user FROM FIREBASE', user);
				this.setState({ email: user.email, didrun: true }, () => {
					console.log(this.state.email);
				});
			}
		});
	};

	handleLogout() {
		firebaseAuth.signOut();
		this.setState({ isSignedIn: false });
	}
	render() {
		console.log('this is the email', this.state.email);
		return (
			<div>
				{this.state.isSignedIn && this.state.didrun === true ? (
					<Query query={checkUserEmail} variables={{ email: this.state.email }}>
						{({ loading, error, data }) => {
							console.log('Data in query', data);
							if (loading) {
								return <div>Loading...</div>;
							}
							if (error) {
								console.log('IM NOT WORKING REDIRECT', error);
								return <Redirect to="/newuser" />;
							} else {
								if (data.id === null) {
								} else {
									this.setState({ userId: data.id, isSignedIn: true }, () => {
										return (
											<Main
												userId={this.state.userId}
												email={this.state.email}
												signedIn={this.state.isSignedIn}
												logout={this.handleLogout}
											/>
										);
									});
								}
							}
						}}
					</Query>
				) : (
					<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
				)}
			</div>
		);
	}
}

export default App;
