require("isomorphic-fetch");
import BPromise from 'bluebird';

async function deleteJob(info){

	console.log("running deleteJob in utils.js");

	const header = {
		'Accept': "application/json",
		'Content-Type': 'application/x-www-form-urlencoded'
	};

	const searchParams = new URLSearchParams(info);
  
	return await fetch("http://localhost:8080/remove-job", {
		method: "DELETE",
		headers: header,
		body: searchParams
	});
}

async function findjobbyid(idnum){
	return await fetch(`http://localhost:8080/find-job-by-id?id=${idnum}`).then(function(resp){
		console.log("idnum " + idnum);
		return resp.json();
	})
}

async function postJob(info){
	const header = {
		'Accept': "application/json",
		'Content-Type': 'application/x-www-form-urlencoded'
	};

	const searchParams = new URLSearchParams(info);

	return await fetch("http://localhost:8080/create-job", {
		method: "POST",
		headers: header,
		body: searchParams
	});
}

async function getjob(){
	return await fetch("http://localhost:8080/").then(function(resp){
		return resp.json();
	});
}

async function searchJobs(query){
	return await fetch(`http://localhost:8080/search?q=${query}`).then(function(resp){
		return resp.json();
	});
}

function handleError(error){
	console.warn(error);
	return null;
}

module.exports = {

	createJob: function(info){
		return postJob(info).catch(handleError);
	},
	findjobbyid: function(info){
		return findjobbyid(info).catch(handleError);
	},
	getjobs: function(){
		return getjob().catch(handleError);
	},
	search: function(query){
		return searchJobs(query).catch(handleError);
	},
	removeJob: function(info){
		return deleteJob(info).catch(handleError);
	}
}

