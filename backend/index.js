const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("port", 8080);
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "jbuser",
	password: "$3Lxq#r37",
	database: "jobboard"
};

const pool = new Pool(config);

app.get("/", async (req, res) => {
	try {
		const template = "SELECT title, employer_name, location, start_date, end_date, description FROM jobs";
		const response = await pool.query(template);
		res.json(response);
		} catch (err) {
			res.json({ status: "error" });
			console.log(err);
		}
});

app.post("/", async (req, res) =>{
	const id = req.query.id;
	try{
		const template1 = "SELECT title FROM jobs WHERE id = $1";
		const response1 = await pool.query(template1, id);
		
		//if no job is found
		if (response1.rowCount == 0) {
			res.json({ status: "error: not found"});
		} else {
			res.json({ status: "ok", results: response1.rows[0] });
			console.log(err);
			const template2 = "DELETE FROM jobs WHERE id = $1";
			const response1 = await pool.query(template2, id);
			res.json({status: "listing deleted"});
		}

	}catch (err) {
		res.json({status: "error: listing not deleted"});
		console.log(err);
	}
});

app.listen(app.get("port"), () => {
	console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
