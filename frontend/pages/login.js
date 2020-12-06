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
			jsCookie.set("description", loggedInUser.description);
			jsCookie.set("id", loggedInUser.id);
			jsCookie.set(loggedInUser.user_type, "true");
			console.log("Cookies are set.")
			Router.push("/");
		}/* else {
			Router.push("/wrongpassword");

		}*/
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
	  	return fetch("http://34.123.48.219:8080/api/check-login", {
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
	  	this.state = {email: "", password: ""};
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




		<span className="bglightblue boxsmall">
			<b>&nbsp;&nbsp;LOG IN&nbsp;&nbsp;</b>
		</span>&nbsp;&nbsp;
		<span href="#" className="bglightblueshaded boxsmall">
			<b>&nbsp;&nbsp;<a href="/createemployer">SIGN UP</a>&nbsp;&nbsp;</b>
		</span>

		<div className="bglightblue boxsmall col">
			<div className="bgwhite box col">
		        <div>




			<h1>Log in </h1>

			<Form>
				<Row>

					<Col>
					
						<Form.Group controlId="formEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control type="text" placeholder="Enter your email address." value={this.state.email} onChange={this.handleEmailUpdate.bind(this)} />
						</Form.Group>

					</Col>

					<Col>

								<Form.Group controlId="formPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password"  placeholder="Enter your password." value={this.state.password} onChange={this.handlePasswordUpdate.bind(this)} />
								</Form.Group>
					
					</Col>
				</Row>

			</Form>


			<Button onClick={this.handleSearch.bind(that)}>
			SUBMIT
			</Button>
			<br />

			{('loggedInUser' in this.state ) ?
				<div>
				{(this.state.loggedInUser.status == "email incorrect" || this.state.loggedInUser.status == "password incorrect") ?
					<p><br /><b>Your email or passsword is incorrect. Please try again.</b></p>
				: null}
				</div>
			: null}


</div>
</div>
</div>


			<style jsx>{``}</style>

			</MyLayout>
		);
	}

}

export default Login;
