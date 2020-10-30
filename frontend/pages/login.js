import React from 'react'
import Router from "next/router";
import jsCookie from "js-cookie";
require("isomorphic-fetch");
import BPromise from "bluebird";

import MyLayout from '../components/mylayout.js';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


class Login extends React.Component {





	async handleSearch(evt) {
		console.log("starting handleSearch");
		const that2 = this;

		const loggedInUser = await this.postlogin({
			email: this.state.email,
			password: this.state.password
		});
		this.setState({ loggedInUser });
		if (loggedInUser.status == "success") {

			jsCookie.set("name", loggedInUser.name);
			jsCookie.set("email", loggedInUser.email);
			jsCookie.set("password", loggedInUser.password);
			jsCookie.set("location", loggedInUser.location);
			jsCookie.set("industry", loggedInUser.industry);
			jsCookie.set("description", loggedInUser.industry);
			jsCookie.set(loggedInUser.user_type, "true");
			console.log("Cookies are set.")
			Router.push("/");
		} else {
			Router.push("/wrongpassword");

		}
	}



//post request
//user_info is json object with email and password
postlogin(user_info) {
	const header = {
		Accept: "application/json",
		"Content-Type": "application/x-www-form-urlencoded"
	};
	console.log(user_info);  
	const searchParams = new URLSearchParams(user_info);

	console.log(searchParams);  
  	return fetch("http://localhost:8080/check-login", {
  		method: "POST",
  		headers: header,
  		body: searchParams

  	}).then(function(resp) {
  		console.log("returning json");
  		return resp.json();
  	});
  }




constructor(props) {
  	super(props);
  	this.state = {email: "Enter your email address", password: "Enter your password"};
}

async handleEmailUpdate(evt){
  	this.setState({email: evt.target.value});
} 


async handlePasswordUpdate(evt){
	this.setState({password: evt.target.value});
}



render() {
	const that = this;
	
	return (
		<MyLayout current="login">

		<h1>Log in </h1>

		
		Username&nbsp;&nbsp;
		<input
		type="text"
		className="text-style"
		value={this.state.email}
		onChange={this.handleEmailUpdate.bind(this)}
		/>

		<br /><br />

		Password&nbsp;&nbsp;
		<input
		type="password"
		className="text-style"
		value={this.state.password}
		onChange={this.handlePasswordUpdate.bind(this)}
		/>
		
		<br /><br />

		<Button onClick={this.handleSearch.bind(that)}>
		SUBMIT
		</Button>

	

		<style jsx>{`






			`}</style>

			</MyLayout>
			);
}

}

export default Login;