DROP DATABASE IF EXISTS jobboard;
CREATE DATABASE jobboard;
DROP TABLE IF EXISTS jobs;
\c jobboard;
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
GRANT SELECT, INSERT, DELETE ON jobs TO jbuser;
GRANT USAGE ON jobs_id_seq TO jbuser;