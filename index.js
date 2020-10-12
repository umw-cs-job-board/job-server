const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("port", 8080);
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

/* once we actually have a database we can edit and uncomment this 
const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "parky",
	password: "mItithaWFAnC",
	database: "parky"
};

const pool = new Pool(config);
*/
app.get("/", (req, res) => {
	res.json("Sup");
});

app.listen(app.get("port"), () => {
	console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
