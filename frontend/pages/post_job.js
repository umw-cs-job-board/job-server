import React from 'react'
import {createJob} from '../lib/utils.js';

class PostJob extends React.Component{

	constructor(props){
		super(props);
		this.state={title:"", employer_name:"", location:"", start_date:"", end_date:"", description:""};
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
			description: this.state.description
		});
		console.log("create job: " + create);
		this.setState({create});
	}

	render(){
		return(
			<div>
				<h1>Post Job</h1>
				<p>Company name</p>
				<input placeholder = 'Google' type="text" value={this.state.employer_name} onChange={this.updateEmployer.bind(this)} />
				<p>Job title</p>
				<input placeholder = 'Senior Data Analyst...' type="text" value={this.state.title} onChange={this.updateTitle.bind(this)} />
				<p>Location</p>
				<input placeholder = 'Fredericksburg, VA...' type="text" value={this.state.location} onChange={this.updateLocation.bind(this)} />
				<p>Start date (YYYY-MM-DD)</p>
				<input placeholder = '2020-10-29' type="text" value={this.state.start_date} onChange={this.updateSD.bind(this)} />
				<p>End date (YYYY-MM-DD)</p>
				<input placeholder = '2020-11-05' type="text" value={this.state.end_date} onChange={this.updateED.bind(this)} />
				<p>description</p>
				<input placeholder = 'This is a job blah blah blah' type="text" value={this.state.description} onChange={this.updateDescription.bind(this)} />
				<br />
				{((this.state.title=="") || (this.state.employer_name=="") || (this.state.location=="") || (this.state.start_date=="") || (this.state.end_date=="") || (this.state.description==""))  ?
					<p>Fill out all fields!</p>
				:<button onClick={this.submit.bind(this)}>Submit</button>}
				{(('create' in this.state) && (this.state.create.status == 200))?
					<p>Job successfully submitted!</p>
					: null
				}

				{(('create' in this.state) && (this.state.create.status == 400))?
					<p>Job not submitted, please check date formatting!</p>
					: null
				}
				<style jsx>{`
					div{
						text-align: center;
						font-family: Arial;
					}
				`}</style>
			</div>
		);
	}

}

export default PostJob;