require("isomorphic-fetch");
import BPromise from 'bluebird';

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
	})
}

function handleError(error){
	console.warn(error);
	return null;
}

module.exports = {
	createJob: function(info){
		return postJob(info).catch(handleError);
	},
	getjobs: function(){
		return getjob().catch(handleError);
	}
}