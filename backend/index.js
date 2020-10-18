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

app.listen(app.get("port"), () => {
	console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
