const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.set("port", 8080);
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//new user: jbuser, password: $3Lxq#r37
//Login using: psql -h localhost -U jbuser jobboard
const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "jbuser",
	password: "$3Lxq#r37",
	database: "jobboard"
};

const pool = new Pool(config);

var dateFormat = require('dateformat');

app.get("/", async (req, res) => {
	try {
		const template = "SELECT id, title, employer_name, location, start_date, end_date, description FROM jobs ORDER BY start_date ASC";
		const response = await pool.query(template);
		const joblist = response.rows.map(function(item){
			return{
				id: item.id,
				title: item.title,
				employer_name: item.employer_name,
				location: item.location,
				start_date: dateFormat(item.start_date, "isoDate"),
				end_date: dateFormat(item.end_date, "isoDate"),
				description: item.description,
				employer_id: item.employer_id
			}
		});
		const ret = {rows: joblist}
		res.json(ret);
		} catch (err) {
			res.json({ status: "error" });
			console.log(err);
		}
});

app.get("/search", async(req, res) =>{
	const query = req.query.q;
	try{
		let template = "SELECT * FROM jobs WHERE title ILIKE $1 ORDER BY start_date ASC";
		let response = await pool.query(template, [`%${query}%`]);
		if(response.rowCount == 0){
			template = "SELECT * FROM jobs WHERE employer_name ILIKE $1 ORDER BY start_date ASC";
			response = await pool.query(template, [`%${query}%`]);
			if(response.rowCount == 0){
				template = "SELECT * FROM jobs WHERE location ILIKE $1 ORDER BY start_date ASC";
				response = await pool.query(template, [`%${query}%`]);
				if(response.rowCount == 0){
					template = "SELECT * FROM jobs WHERE description ILIKE $1 ORDER BY start_date ASC";
					response = await pool.query(template, [`%${query}%`]);
				}
			}
		}
		const joblist = response.rows.map(function(item){
			return{
				id: item.id,
				title: item.title,
				employer_name: item.employer_name,
				location: item.location,
				start_date: dateFormat(item.start_date, "isoDate"),
				end_date: dateFormat(item.end_date, "isoDate"),
				description: item.description,
				employer_id: item.employer_id
			}
		});
		const ret = {rows: joblist}
		res.json(ret);
	}catch(err){
		console.error(err);
	}
});

app.get("/find-job-by-id", async (req, res) => {
	const id = req.query.id;
	console.log(id);
	try {
		const template = "SELECT id, title, employer_name, location, start_date, end_date, description, employer_id FROM jobs WHERE id = $1 ORDER BY start_date ASC";
		const response = await pool.query(template, [id]);

		console.log(response);

		const joblist = response.rows.map(function(item){
			return{
				id: item.id,
				title: item.title,
				employer_name: item.employer_name,
				location: item.location,
				start_date: dateFormat(item.start_date, "isoDate"),
				end_date: dateFormat(item.end_date, "isoDate"),
				description: item.description,
				employer_id: item.employer_id

			}
		});
		const ret = {rows: joblist}

		res.json(ret);
		} catch (err) {
			res.json({ status: "error" });
			console.log(err);
		}
});





//Remove Job
app.delete("/remove-job", async (req, res) => {
	const id = req.body.id;
	console.log("running remove job api");
	
	try {
		//Creating a query to check if the job to be removed exists in the job database.
		console.log("req.body ");
		console.log(req.body);
		

		console.log("id ");
		console.log(id);
		const template1 = "SELECT title FROM jobs WHERE id = $1";
		const response1 = await pool.query(template1, [id]);
		
		console.log("response1 ");
		console.log(response1);
		

		//If no job is found in the job database matching the id, then error.
		if (response1.rowCount == 0) {
			console.log("job not found");
			res.json({ status: "error: not found"});
		} 
		//If the job does exist in the job database, then delete it.
		else {
			//res.json({ status: "ok", results: response1.rows[0] });
			//console.log(err);
			const template2 = "DELETE FROM jobs WHERE id = $1";
			const response1 = await pool.query(template2, [id]);
			console.log("deleting job");
			res.json({status: "listing deleted"});
		}
	} catch (err) {
		res.json({status: "error: listing not deleted"});
		console.log(err);
	}
});

//create job and add it to the database
app.post("/create-job", async (req, res) => {

	console.log("----------");

	try {
		
		console.log(req.body);
		//title, employer_name, location, start_date , end_date, description
		const title_to_add = req.body.title;
		const employer_name_to_add = req.body.employer_name;
		const location_to_add = req.body.location;
		const start_date_to_add = req.body.start_date;
		const end_date_to_add = req.body.end_date;
		const description_to_add = req.body.description;
		const employer_id_to_add = req.body.employer_id;

		//if parameter is missing while trying to add, return error
		if (title_to_add == null || employer_name_to_add == null || location_to_add == null || start_date_to_add == null || end_date_to_add == null || description_to_add == null) {
			console.error("info missing")
			res.json({ error : "info missing"});			
		}

		else {
			
			console.log("job about to be added");

			const template2 = "INSERT INTO jobs (title, employer_name, location, start_date, end_date, description, employer_id) VALUES ($1, $2, $3, TO_DATE($4, 'YYYY-MM-DD'), TO_DATE($5, 'YYYY-MM-DD'), $6, $7)";
			const response2 = await pool.query(template2, [
				title_to_add,
				employer_name_to_add,
				location_to_add,
				start_date_to_add,
				end_date_to_add,
				description_to_add,
				employer_id_to_add
				]);
			console.log("job added");
			res.json({ "status" : "job added" });
			
		}
	} catch (err) {
		res.sendStatus(400);

		console.log(err);
	}

});

//get all employers
app.get("/get-employer", async (req, res) => {
	try {
		const template = "SELECT id, name, location, industry, description FROM employers WHERE name != 'UMW CPSC' ORDER BY name ASC";
		const response = await pool.query(template);
		const employerlist = response.rows.map(function(item){
			return{
				id: item.id,
				name: item.name,
				location: item.location,
				industry: item.industry,
				description: item.description
			}
		});
		const ret = {rows: employerlist}
		res.json(ret);
		} catch (err) {
			res.json({ status: "error" });
			console.log(err);
		}
});

app.get("/find-employer-by-id", async (req, res) => {
	const id = req.query.id;
	console.log(id);
	try {
		const template = "SELECT id, name, location, industry, description FROM employers WHERE id = $1 AND name != 'UMW CPSC'";
		const response = await pool.query(template, [id]);
		console.log(response);

		const employerslist = response.rows.map(function(item){
			return{
				id: item.id,
				name: item.name,
				location: item.location,
				industry: item.industry,
				description: item.description

			}
		});
		const ret = {rows: employerslist}

		res.json(ret);
		} catch (err) {
			res.json({ status: "error" });
			console.log(err);
		}
});





app.get("/search-employers", async(req, res) =>{
	const query = req.query.q;

	try{
		let template = "SELECT * FROM employers WHERE name ILIKE $1 ORDER BY name ASC";
		let response = await pool.query(template, [`%${query}%`]);
		if(response.rowCount == 0){
			template = "SELECT * FROM employers WHERE industry ILIKE $1 ORDER BY name ASC";
			response = await pool.query(template, [`%${query}%`]);
			if(response.rowCount == 0){
				template = "SELECT * FROM employers WHERE location ILIKE $1 ORDER BY name ASC";
				response = await pool.query(template, [`%${query}%`]);
				if(response.rowCount == 0){
					template = "SELECT * FROM employers WHERE description ILIKE $1 ORDER BY name ASC";
					response = await pool.query(template, [`%${query}%`]);
				}
			}
		}
		const employerlist = response.rows.map(function(item){
			return{
				id: item.id,
				name: item.name,
				industry: item.industry,
				location: item.location,
				description: item.description
			}
		});
		const ret = {rows: employerlist}
		res.json(ret);
	}catch(err){
		console.error(err);
	}
});



//Remove employer
app.delete("/remove-employer", async (req, res) => {
	const id = req.body.id;
	console.log("running remove employer api");
	
	try {
		//Creating a query to check if the job to be removed exists in the job database.
		console.log("req.body ");
		console.log(req.body);
		

		console.log("id ");
		console.log(id);
		const template1 = "SELECT name FROM employers WHERE id = $1";
		const response1 = await pool.query(template1, [id]);
		
		console.log("response1 ");
		console.log(response1);
		

		//If no employer is found in the employer database matching the id, then error.
		if (response1.rowCount == 0) {
			console.log("employer not found");
			res.json({ status: "error: not found"});
		} 
		//If the employer does exist in the job database, then delete it.
		else {
			//res.json({ status: "ok", results: response1.rows[0] });
			//console.log(err);
			const template2 = "DELETE FROM employers WHERE id = $1";
			const response1 = await pool.query(template2, [id]);
			console.log("deleting employer");
			res.json({status: "employer deleted"});
		}
	} catch (err) {
		res.json({status: "error: listing not deleted"});
		console.log(err);
	}
});

app.get("/find-review-by-id", async (req, res) => {
	const id = req.query.id;
	console.log(id);
	try {
		const template = "SELECT id, emp_id, reviewer, title, description, posted_date, affiliation, rating FROM reviews WHERE emp_id = $1";
		const response = await pool.query(template, [id]);

		console.log(response);

		const reviewlist = response.rows.map(function(item){
			return{
				id: item.id,
				emp_id: item.emp_id,
				reviewer: item.reviewer,
				title: item.title,
				description: item.description,
				posted_date: dateFormat(item.posted_date, "isoDate"),
				affiliation: item.affiliation,
				rating: item.rating

			}
		});
		const ret = {rows: reviewlist}

		res.json(ret);
		} catch (err) {
			res.json({ status: "error" });
			console.log(err);
		}
});


//create job and add it to the database
app.post("/create-review", async (req, res) => {

	console.log("----------");

	try {
		
		console.log(req.body);
		//title, employer_name, location, start_date , end_date, description
		const employer_id_to_add = req.body.employer_id;
		const reviewer_to_add = req.body.reviewer;
		const title_to_add = req.body.title;
		const rating_to_add = req.body.rating;
		const description_to_add = req.body.description;
		const posted_date_to_add = req.body.posted_date;
		const affiliation_to_add = req.body.affiliation;

		//if parameter is missing while trying to add, return error
		if (employer_id_to_add == null || reviewer_to_add == null || title_to_add == null || rating_to_add == null || description_to_add == null || posted_date_to_add == null || affiliation_to_add == null) {
			console.error("info missing");
			console.log("employer_id_to_add, " + employer_id_to_add);
			res.json({ error : "info missing"});			
		}

		else {
			
			console.log("review about to be added");

			const template2 = "INSERT INTO reviews (emp_id, reviewer, title, rating, description, posted_date, affiliation) VALUES ($1, $2, $3, $4, $5, TO_DATE($6, 'YYYY-MM-DD'), $7)";
			const response2 = await pool.query(template2, [
				employer_id_to_add,
				reviewer_to_add,
				title_to_add,
				rating_to_add,
				description_to_add,
				posted_date_to_add,
				affiliation_to_add
				]);
			console.log("review added");
			res.json({ "status" : "review added" });
			
		}
	} catch (err) {
		res.sendStatus(400);

		console.log(err);
	}

});




//checks email and password, returns status, user's info and whether they are admin or employer

app.post("/check-login", async (req, res) => 
{
	const employer_email = req.body.email;
	const employer_password = req.body.password;
	
	//console.log(req.body);
	//console.log(employer_email);
	//console.log(employer_password);

	try 
	{
		const template2 = "SELECT * FROM employers WHERE email = $1";
		const result = await pool.query(template2, [ employer_email ]);

		//console.log("found user: ");
		//console.log(result.rows);
		//console.log(result.rowCount);
		

		if (result.rowCount == 1) 
		{
			//console.log("starting argon2 compare");
			//console.log(password);
			//console.log(result.rows[0].password);

			//I took out the argon2 encryption for now -- james
			//if (await argon2.verify(result.rows[0].user_password, password)) {
			if (result.rows[0].password == employer_password) {

				console.log("Passwords match.");

				//check to see if the login is by an admin
				if (result.rows[0].email == "cpscinternshipproject@gmail.com") {
					res.json({ status: "success",
							email: result.rows[0].email,
							password: result.rows[0].password,
							name: result.rows[0].name,
							location: result.rows[0].location,
							industry: result.rows[0].industry,
							description: result.rows[0].description,
							user_type: "admin"
					 });
				}
				else {
					res.json({ status: "success",
							id: result.rows[0].id,
							email: result.rows[0].email,
							password: result.rows[0].password,
							name: result.rows[0].name,
							location: result.rows[0].location,
							industry: result.rows[0].industry,
							description: result.rows[0].description,
							user_type: "employer"
					 });
				}

			} else {
				console.log("password incorrect.");
				res.json({ status: "password incorrect" });
			}

		}
		else 
		{
			res.json({ status: "email incorrect" });
		}
		
	} 
	catch (err) 
	{
		console.log(err);
	}

});







app.listen(app.get("port"), () => {
	console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
