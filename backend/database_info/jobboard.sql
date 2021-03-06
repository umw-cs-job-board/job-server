DROP DATABASE IF EXISTS jobboard;
CREATE DATABASE jobboard;
\c jobboard;

CREATE TABLE employers
(
	id SERIAL PRIMARY KEY, 
	name VARCHAR(100) NOT NULL, 
	email VARCHAR(100) NOT NULL, 
	password VARCHAR(100) NOT NULL, 
	location VARCHAR(100) NOT NULL,
	industry VARCHAR(100) NOT NULL, 
	description VARCHAR NOT NULL 
);
GRANT SELECT, INSERT, UPDATE, DELETE ON employers TO jbuser;
GRANT USAGE ON employers_id_seq TO jbuser;

INSERT INTO employers(name, email, password, location, industry, description) VALUES ('CACI', 'caci@gmail.com', 'caci', 'Quantico, Va.', 'Airline Supply', 'We supply airplane parts to US military organizations');
INSERT INTO employers(name, email, password, location, industry, description) VALUES ('UMW CPSC', 'cpscinternshipproject@gmail.com', 'admin', 'Fredericksburg, Va.', 'Academia', 'University of Mary Washington Computer Science Department');
INSERT INTO employers(name, email, password, location, industry, description) VALUES ('AOL', 'aol@aol.com', 'test', 'Reston, Va.', 'Internet service provider', 'We are going to rule the world.');

CREATE TABLE jobs
(
	id SERIAL PRIMARY KEY, 
	title VARCHAR(100) NOT NULL, 
	employer_name VARCHAR(100) NOT NULL, 
	location VARCHAR(100) NOT NULL, 
	start_date DATE NOT NULL, 
	end_date DATE NOT NULL, 
	description VARCHAR NOT NULL,
	contact VARCHAR NOT NULL,
	employer_id INTEGER NOT NULL--,
--	CONSTRAINT employer_id_fk FOREIGN KEY(employer_id) REFERENCES employers(id)
);
GRANT SELECT, INSERT, DELETE ON jobs TO jbuser;
GRANT USAGE ON jobs_id_seq TO jbuser;

INSERT INTO jobs(title, employer_name, location, start_date , end_date, description, contact, employer_id) VALUES ('Java developer', 'CACI', 'King George, VA', '2021-01-01', '2021-04-01', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem lacus, rhoncus sed placerat sit amet, pulvinar nec turpis. Aliquam in eros non eros rhoncus molestie nec a augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed consectetur efficitur magna sit amet rhoncus. Duis ultricies semper nulla, nec congue nibh mattis eu. Morbi rutrum eros sit amet metus efficitur, non gravida tortor venenatis. Nulla eget ullamcorper sem. Quisque velit risus, imperdiet ac laoreet in, congue sit amet dui. Nullam sit amet nulla nunc. Nullam eleifend blandit felis, vel fermentum nibh tincidunt ac. Vivamus a congue purus. Suspendisse malesuada fringilla diam, rhoncus semper est tempus sit amet.', 'Caci.com', '1');
INSERT INTO jobs(title, employer_name, location, start_date , end_date, description, contact, employer_id) VALUES ('developer', 'CACI', 'King George, VA', '2021-01-01', '2021-04-01', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem lacus, rhoncus sed placerat sit amet, pulvinar nec turpis. Aliquam in eros non eros rhoncus molestie nec a augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed consectetur efficitur magna sit amet rhoncus. Duis ultricies semper nulla, nec congue nibh mattis eu. Morbi rutrum eros sit amet metus efficitur, non gravida tortor venenatis. Nulla eget ullamcorper sem. Quisque velit risus, imperdiet ac laoreet in, congue sit amet dui. Nullam sit amet nulla nunc. Nullam eleifend blandit felis, vel fermentum nibh tincidunt ac. Vivamus a congue purus. Suspendisse malesuada fringilla diam, rhoncus semper est tempus sit amet.', 'Caci.com', '1');

CREATE TABLE reviews
(
	id SERIAL PRIMARY KEY,
	emp_id INTEGER,
	reviewer VARCHAR(100) NOT NULL, 
	title VARCHAR(100) NOT NULL, 
	description VARCHAR(100) NOT NULL, 
	posted_date DATE NOT NULL,
	affiliation VARCHAR(100) NOT NULL,
	rating INTEGER NOT NULL,
	flagged BOOLEAN NOT NULL,
	CONSTRAINT emp_id_fk FOREIGN KEY(emp_id) REFERENCES employers(id)
);
ALTER TABLE reviews ALTER COLUMN flagged SET DEFAULT false;
GRANT SELECT, INSERT, UPDATE, DELETE ON reviews TO jbuser;
GRANT USAGE ON reviews_id_seq TO jbuser;
