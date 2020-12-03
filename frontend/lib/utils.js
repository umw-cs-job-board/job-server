require("isomorphic-fetch");
import BPromise from 'bluebird';




//jobs

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






//employers


async function deleteEmployer(info){

	console.log("running deleteEmployer in utils.js");

	const header = {
		'Accept': "application/json",
		'Content-Type': 'application/x-www-form-urlencoded'
	};

	const searchParams = new URLSearchParams(info);
  
	return await fetch("http://localhost:8080/remove-employer", {
		method: "DELETE",
		headers: header,
		body: searchParams
	});
}

async function post_review(info){
	const header = {
		'Accept': "application/json",
		'Content-Type': 'application/x-www-form-urlencoded'
	};

	const searchParams = new URLSearchParams(info);

	return await fetch("http://localhost:8080/create-review", {
		method: "POST",
		headers: header,
		body: searchParams
	});
}

async function get_reviews_by_emp(idnum){
	return await fetch(`http://localhost:8080/find-review-by-id?id=${idnum}`).then(function(resp){
		console.log("idnum " + idnum);
		return resp.json();
	})
}

async function delete_review(idnum){
	console.log("delete review in utils.js");

	const header = {
    	'Accept': 'application/json',
    	'Content-Type': 'application/x-www-form-urlencoded'
    };

    const searchParams = new URLSearchParams(idnum);

    return await fetch("http://localhost:8080/delete-review", {
        method: "DELETE",
        headers: header,
		body: searchParams
    });
}

async function findemployerbyid(idnum){
	return await fetch(`http://localhost:8080/find-employer-by-id?id=${idnum}`).then(function(resp){
		console.log("idnum " + idnum);
		return resp.json();
	})
}

async function findemployerbyid2(idnum){
	return await fetch(`http://localhost:8080/find-employer-by-id-2?id=${idnum}`).then(function(resp){
		console.log("idnum " + idnum);
		return resp.json();
	})
}

async function postEmployer(info){
	const header = {
		'Accept': "application/json",
		'Content-Type': 'application/x-www-form-urlencoded'
	};

	const searchParams = new URLSearchParams(info);

	return await fetch("http://localhost:8080/create-employer", {
		method: "POST",
		headers: header,
		body: searchParams
	});
}

async function editEmployer(info){
	const header = {
		'Accept': "application/json",
		'Content-Type': 'application/x-www-form-urlencoded'
	};

	const searchParams = new URLSearchParams(info);

	return await fetch("http://localhost:8080/edit-employer", {
		method: "POST",
		headers: header,
		body: searchParams
	});
}

async function getEmployer(){
	return await fetch("http://localhost:8080/get-employer").then(function(resp){
		return resp.json();
	});
}

async function searchEmployers(query){
	return await fetch(`http://localhost:8080/search-employers?q=${query}`).then(function(resp){
		return resp.json();
	});
}

async function flag_reviews(info){
	const header = {
		'Accept': "application/json",
		'Content-Type': 'application/x-www-form-urlencoded'
	};

	const searchParams = new URLSearchParams(info);

	return await fetch("http://localhost:8080/flag-review", {
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
	},
	createEmployer: function(info){
		return postEmployer(info).catch(handleError);
	},
	editEmployer: function(info){
		return editEmployer(info).catch(handleError);
	},
	findemployerbyid: function(info){
		return findemployerbyid(info).catch(handleError);
	},
	findemployerbyid2: function(info){
		return findemployerbyid2(info).catch(handleError);
	},
	getemployers: function(){
		return getEmployer().catch(handleError);
	},
	searchEmployers: function(query){
		return searchEmployers(query).catch(handleError);
	},
	removeEmployer: function(info){
		return deleteEmployer(info).catch(handleError);
	},
	get_reviews: function(info){
		return get_reviews_by_emp(info).catch(handleError);
	},
	create_reviews: function(info){
		return post_review(info).catch(handleError);
	},
	flag_review: function(info){
		return flag_reviews(info).catch(handleError);
	},
	remove_review: function(info){
		return delete_review(info).catch(handleError);
	}

}

