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

class CreateEmployer extends React.Component {

	async handleSearch(evt) {
		
		console.log("starting handleSearch");
		const that2 = this;

		const loggedInUser = await this.createLogin({
			email: this.state.email,
			password: this.state.password,
			name: this.state.name,
			industry: this.state.industry,
			location: this.state.location,
			description: this.state.description,
			
		});
		this.setState({ loggedInUser });
		if (loggedInUser.status == "success") {
			console.log("loggedInUser: ");
			console.log(loggedInUser);
			jsCookie.set("email", this.state.email);
			//jsCookie.set("password", this.state.password);
			jsCookie.set("name", this.state.name);
			jsCookie.set("location", this.state.location);
			jsCookie.set("industry", this.state.industry);
			jsCookie.set("description", this.state.description);
			jsCookie.set("id", loggedInUser.id);
			jsCookie.set(loggedInUser.user_type, "true"); 
			console.log("Cookies are set.")
			Router.push("/");
		}/* else {
			Router.push("/wrongpassword");

		}*/
	}

	//post request
	//user_info is json object with email, password, name, industry, location, description
	createLogin(user_info) {
		const header = {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		};
		console.log(user_info);  
		const searchParams = new URLSearchParams(user_info);

		console.log(searchParams);  
	  	return fetch("http://34.123.48.219:8080/api/create-employer", {
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
	  	this.state = {
	  		email: "", 
		  	password: "",
		  	name: "",
		  	location: "",
		  	industry: "",
		  	description: "",
		  	passwordOK:false
		};

		jsCookie.remove('name');
	    jsCookie.remove('email');
	    jsCookie.remove('password');
	    jsCookie.remove('location');
	    jsCookie.remove('industry');
	    jsCookie.remove('description');
	    jsCookie.remove('user_type');
	    jsCookie.remove('admin');
	    jsCookie.remove('employer');  
		
	}

	async handleEmailUpdate(evt){
	  	this.setState({email: evt.target.value});
	} 

	async handlePasswordUpdate(evt){

		this.setState({password: evt.target.value}, ()=> {

			/* Regex parts explanation
			^ Start anchor
			(?=.*[A-Z]){1,} Ensure string has one uppercase letter.
			(?=.*[!@#$&*]){1,} Ensure string has one special case letter.
			(?=.*[0-9]){1,} Ensure string has one digit.
			(?=.*[a-z]){1,} Ensure string has one lowercase letter.
			.{8,} Ensure string is at least of length 8.
			$       
			*/

	        const re = new RegExp("^(?=.*[A-Z]){1,}(?=.*[!@#$&*]){1,}(?=.*[0-9]){1,}(?=.*[a-z]){1,}.{8,}$");
			//const re = new RegExp("^.{8,}$");
	        this.setState({passwordOK: re.test(this.state.password)});
	        
	        console.log(this.state.password);
	        console.log(this.state.passwordOK);
	    });

	}

	async handleNameUpdate(evt){
		this.setState({name: evt.target.value});
	}

	async handleLocationUpdate(evt){
		this.setState({location: evt.target.value});
	}

	async handleIndustryUpdate(evt){
		this.setState({industry: evt.target.value});
	}

	async handleDescriptionUpdate(evt){
		this.setState({description: evt.target.value});
	}




	render() {
		const that = this;
		
		return (
			<MyLayout current="login">



		<span className="bglightblueshaded boxsmall">
			<b>&nbsp;&nbsp;<a href="/login">LOG IN</a>&nbsp;&nbsp;</b>
		</span>&nbsp;&nbsp;
		<span href="#" className="bglightblue boxsmall">
			<b>&nbsp;&nbsp;SIGN UP&nbsp;&nbsp;</b>
		</span>

		<div className="bglightblue boxsmall col">
			<div className="bgwhite box col">
		        <div>



			<h1>Create an employer profile </h1>

			
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


				<Row>

					<Col>
						<Form.Group controlId="formName">
						<Form.Label>Company / organization name</Form.Label>
						<Form.Control type="text" value={this.state.name}  placeholder="Enter your company / organization name." onChange={this.handleNameUpdate.bind(this)} />
						</Form.Group>
					</Col>

					<Col>
						<Form.Group controlId="formIndustry">
						<Form.Label>Industry</Form.Label>
						<Form.Control type="text" value={this.state.industry}  placeholder="Enter your industry." onChange={this.handleIndustryUpdate.bind(this)} />
						</Form.Group>
					</Col>

					<Col>
						<Form.Group controlId="formLocation">
						<Form.Label>Location</Form.Label>
						<Form.Control type="text" value={this.state.location}  placeholder="Enter your city and state." onChange={this.handleLocationUpdate.bind(this)} />
						</Form.Group>
					</Col>

				</Row>
				<Row>
			

					<Col>
						<Form.Group controlId="formDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder="Enter your description." type="text" value={this.state.description} onChange={this.handleDescriptionUpdate.bind(this)} />
						</Form.Group>
					</Col>

				</Row>


				{((this.state.email=="") || (this.state.password=="") || (this.state.name=="") || (this.state.location=="") || (this.state.industry=="") || (this.state.description=="")) || (this.state.passwordOK==false) ?
							<p>Fill out all fields and make sure password meets requirements (At least eight characters, at least one uppercase letter, one lowercase letter, a number and a symbol(!@#$&*)<br /></p>
						:<Button onClick={this.handleSearch.bind(that)}>
							SUBMIT
						</Button>
				}

			</Form>

			

			{('loggedInUser' in this.state ) ?
				<div>
				{(this.state.loggedInUser.status == "email already exists") ?
					<p><br /><b>The email address has already been used. Use a different email address or try logging in.</b></p>
				: null}


				{(this.state.loggedInUser.status == "name already exists") ?
					<p><br /><b>The employer name has already been taken. Use a different name.</b></p>
				: null}


				{(this.state.loggedInUser.status == "error") ?
					<p><br /><b>There was an error creating an account. If the problem persists, contact an Administrator.</b></p>
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

export default CreateEmployer;
