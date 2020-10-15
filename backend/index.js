const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("port", 8080);
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));


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



//test
app.get("/", (req, res) => {
	res.json("Sup");
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




		//if parameter is missing while trying to add, return error
		if (title_to_add == null || employer_name_to_add == null || location_to_add == null || start_date_to_add == null || end_date_to_add == null || description_to_add == null) {
			console.error("info missing")
			res.json({ error : "info missing"});			
		}

		else {
			
			console.log("job about to be added");

			const template2 = "INSERT INTO jobs (title, employer_name, location, start_date, end_date, description) VALUES ($1, $2, $3, $4, $5, $6)";
			const response2 = await pool.query(template2, [
				title_to_add,
				employer_name_to_add,
				location_to_add,
				start_date_to_add,
				end_date_to_add,
				description_to_add
				]);
			console.log("job added");
			res.json({ status : "job added" });
			
		}
	} 

	catch (err) {
		console.error(err);
		res.json({ error : "error adding job" });
	}

});














app.listen(app.get("port"), () => {
	console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
