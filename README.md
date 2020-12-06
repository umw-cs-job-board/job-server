# job-server
UMW CS Job board server and database

for testing in development (not on google cloud instance):
- if any changes to /job-server/backend/database-info/jobboard.sql
	- sudo -u postgres psql
	- \i jobboard.sql
- npm run dev : start front end (in /job-server/frontend)
- node index.js : run back end (in /job-server/backend)
- navigate to localhost:3000

production instructions
- to view the production site, navigate to https://34.123.48.219/
- to restart the website server (such as after pulling changes from main and prepending index.js routes with /api and changing localhost:8080 to 34.123.48.219:8080/api in /frontend/lib/utils.js or other places that fetch from backend):
	- in /job-server/backend: pm2 index.js
	- in /frontend:
		- npm run build
		- pm2 start npm --name "next" -- start

