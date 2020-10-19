require("isomorphic-fetch");
import BPromise from 'bluebird';

async function deleteJob(info){
	const header = {
		'Accept': "application/json",
		'Content-Type': 'application/x-www-form-urlencoded'
	};

	const searchParams = new URLSearchParams(info);

	return await fetch("http://localhost:8080/remove-job", {
		method: "POST",
		headers: header,
		body: searchParams
	});
}

function handleError(error){
	console.warn(error);
	return null;
}

module.exports = {
	removeJob: function(info){
		return deleteJob(info).catch(handleError);
	}
}
