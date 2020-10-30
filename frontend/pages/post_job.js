import React from 'react'
import {createJob} from '../lib/utils.js';

import MyLayout from '../components/mylayout.js';
import jsCookie from "js-cookie";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


class PostJob extends React.Component{

	constructor(props){
		super(props);

    	var today = new Date();
        var todayPlus30 = new Date();
        todayPlus30.setDate(todayPlus30.getDate() + 30);
        var todayDate = (today.getFullYear() + '-' + (today.getMonth()+1) + '-' +  today.getDate());
        var todayPlus30Date = (todayPlus30.getFullYear() + '-' + (todayPlus30.getMonth()+1) + '-' +  todayPlus30.getDate());
		this.state={title:"", employer_name:(jsCookie.get("name")), location:"", start_date:todayDate, end_date:todayPlus30Date, description:"", id: jsCookie.get("id")};
	}

	async updateTitle(evt){
		this.setState({title: evt.target.value});
	}

	async updateEmployer(evt){
		this.setState({employer_name: evt.target.value});
	}

	async updateLocation(evt){
		this.setState({location: evt.target.value});
	}

	async updateSD(evt){
		this.setState({start_date: evt.target.value});
	}

	async updateED(evt){
		this.setState({end_date: evt.target.value});
	}

	async updateDescription(evt){
		this.setState({description: evt.target.value});
	}

	async submit(evt){
		const create = await createJob({
			title: this.state.title,
			employer_name: this.state.employer_name,
			location: this.state.location,
			start_date: this.state.start_date,
			end_date: this.state.end_date,
			description: this.state.description,
			employer_id: this.state.id
		});
		console.log("create job: " + create);
		this.setState({create});
	}




	render(){
		return(
			<MyLayout current="post_job">
			<div>

				<Form>
				<h1>Post a job</h1>
				
				<Row>
					<Col>
						<Form.Group controlId="formCompanyName">
						<Form.Label>Company name</Form.Label>
						<Form.Control type="text" value={this.state.employer_name} onChange={this.updateEmployer.bind(this)} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formJobTitle">
						<Form.Label>Job title</Form.Label>
						<Form.Control placeholder = 'Senior Data Analyst...' type="text" value={this.state.title} onChange={this.updateTitle.bind(this)} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formLocation">
						<Form.Label>Location</Form.Label>
						<Form.Control placeholder = 'Fredericksburg, VA...' type="text" value={this.state.location} onChange={this.updateLocation.bind(this)} />
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col>
						<Form.Group controlId="formStartDate">
						<Form.Label>Start date (YYYY-MM-DD)</Form.Label>
						<Form.Control  placeholder = 'YYYY-MM-DD' type="text" value={this.state.start_date} onChange={this.updateSD.bind(this)} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formEndDate">
						<Form.Label>End date (YYYY-MM-DD)</Form.Label>
						<Form.Control placeholder = 'YYYY-MM-DD' type="text" value={this.state.end_date} onChange={this.updateED.bind(this)} />
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col>
						<Form.Group controlId="formDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder = 'This is a job blah blah blah' type="text" value={this.state.description} onChange={this.updateDescription.bind(this)} />
						</Form.Group>
					</Col>
				</Row>

				{((this.state.title=="") || (this.state.employer_name=="") || (this.state.location=="") || (this.state.start_date=="") || (this.state.end_date=="") || (this.state.description==""))  ?
					<p>Fill out all fields!<br /></p>
				:<p><Button onClick={this.submit.bind(this)}>Submit</Button><br /></p>}
				{(('create' in this.state) && (this.state.create.status == 200))?
					<p>Job successfully submitted!<br /></p>
					: null
				}

				{(('create' in this.state) && (this.state.create.status == 400))?
					<p>Job not submitted. Please check date formatting!<br /></p>
					: null
				}


				</Form>
				<br />
				<br />
				<style jsx>{`
					

				`}</style>
			</div>
			</MyLayout>
		);
	}

}

export default PostJob;