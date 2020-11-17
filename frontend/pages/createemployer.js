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

			jsCookie.set("email", loggedInUser.email);
			jsCookie.set("password", loggedInUser.password);
			jsCookie.set("name", loggedInUser.name);
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
	//user_info is json object with email, password, name, industry, location, description
	createLogin(user_info) {
		const header = {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		};
		console.log(user_info);  
		const searchParams = new URLSearchParams(user_info);

		console.log(searchParams);  
	  	return fetch("http://localhost:8080/check-login", {/////////////////need name of new api function
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
	  		email: "Enter your email address", 
		  	password: "Enter your password",
		  	name: "Enter the name of your company/organization",
		  	location: "Enter your location",
		  	industry: "Enter your industry type",
		  	description: "Enter your description"
		};
	}

	async handleEmailUpdate(evt){
	  	this.setState({email: evt.target.value});
	} 

	async handlePasswordUpdate(evt){
		this.setState({password: evt.target.value});
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

			<h1>Create an employer profile </h1>

			
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

			Company / organization name&nbsp;&nbsp;
			<input
			type="text"
			className="text-style"
			value={this.state.name}
			onChange={this.handleNameUpdate.bind(this)}
			/>


			<br /><br />

			Industry&nbsp;&nbsp;
			<input
			type="text"
			className="text-style"
			value={this.state.industry}
			onChange={this.handleIndustryUpdate.bind(this)}
			/>


			<br /><br />

			Location&nbsp;&nbsp;
			<input
			type="text"
			className="text-style"
			value={this.state.location}
			onChange={this.handleLocationUpdate.bind(this)}
			/>


			<br /><br />

			Description&nbsp;&nbsp;
			<input
			type="text"
			className="text-style"
			value={this.state.description}
			onChange={this.handleDescriptionUpdate.bind(this)}
			/>



			<br /><br />

			<Button onClick={this.handleSearch.bind(that)}>
			SUBMIT
			</Button>


			{('loggedInUser' in this.state ) ?
				<div>
				{(this.state.loggedInUser.status == "email already exists") ?
					<p><b>The email address has already been used. Use a different email address or try logging in.</b></p>
				: null}


				{(this.state.loggedInUser.status == "name already exists") ?
					<p><b>The employer name has already been taken. Use a different name.</b></p>
				: null}


				{(this.state.loggedInUser.status == "error") ?
					<p><b>There was an error creating an account. If the problem persists, contact an Administrator.</b></p>
				: null}


				</div>
			: null}








			<style jsx>{``}</style>

			</MyLayout>
		);
	}

}

export default CreateEmployer;