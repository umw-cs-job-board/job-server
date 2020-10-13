\c jobboard
DROP TABLE IF EXISTS jobs;
CREATE TABLE jobs
(
	id SERIAL PRIMARY KEY, 
	title VARCHAR(100) NOT NULL, 
	employer_name VARCHAR(100) NOT NULL, 
	location VARCHAR(100) NOT NULL, 
	start_date DATE NOT NULL, 
	end_date DATE NOT NULL, 
	description VARCHAR NOT NULL
);
