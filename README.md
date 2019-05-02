# eatwise
CMSC 128 A-1L project: Eatwise!

// INSTALL APPLICATIONS TO BE USED ========================================================================
	1.) install mariadb
			https://computingforgeeks.com/install-mariadb-10-on-ubuntu-18-04-and-centos-7/
	2.) install nodejs
			sudo npm cache clean -f
			sudo npm install -g n
			sudo n stable
// LOAD DATABASE ==========================================================================================
	1.) open mysql/ mariadb by typing in cmd:
			mysql -u root -p
			// enter your password if prompted

	2.) load database by typing:
			source eatwise.sql

// INSTALLATION ===========================================================================================
	# Go to any directory (In my case "Desktop")
	
	1.) mkdir Eatwise
	
	2.) cd Eatwise
	
	3.) mkdir back-end 
	
	4.) cd back-end
	
	5.) do the following:
		npm init								
		npm install mysql	
		npm install --save express  	
		npm install --save express body-parser 	
		npm install --save express-session
		npm install bcryptjs			
		npm install express-jwt			
		npm install request						
		npm install cors

	6.) cd ../
	
	7.) install create-react-app
		sudo npm install -g create-react-app
	
	8.) create folder "front-end"	
		create-react-app front-end
		cd front-end
	
	9.) do the following:
		npm install react-bootstrap
		npm install --save react-router react-router-dom
		npm install --save axios
		npm install jwt-decode
		npm install query-string
		npm install react-star-rating-component --save
		npm install react-rater
		npm install react-files --save
		npm install react-mapbox-gl mapbox-gl --save

		npm audit fix							// incase of vulnerabilities

	10.) copy files from back-end and front-end folders from team drive to your local back-end and front-end folders
		10.1.) for the back-end subfolder copy the following:
				Controllers 		(folder)
				Routers 			(folder)
				index.json			(file)
				request.js 			(file)

		10.2.) For the front-end subfolder copy the following:
				src 				(folder)

	11.) Edit router.js in back-end/Routers
				let connection = mysql.createConnection({
				    host: 'localhost',
				    user: 'root',
				    password: '',
				    database: 'eatwise'
				});
		// change the password value to the password of your mariadb/ mysql database 

	12.) modify "package.json" in the "front-end" subfolder:
			1.) and add "proxy": "http://localhost:2019"
			2.) modify start in scripts and add PORT=2020
			
			ex.				
				{
				  "name": "client",
				  "version": "0.1.0",
				  "private": true,
				  "dependencies": {
				    "axios": "^0.18.0",
				    "jwt-decode": "^2.2.0",
				    "mapbox-gl": "^0.54.0",
				    "query-string": "^6.5.0",
				    "react": "^16.8.6",
				    "react-bootstrap": "^1.0.0-beta.8",
				    "react-dom": "^16.8.6",
				    "react-files": "^2.4.8",
				    "react-mapbox-gl": "^4.2.3",
				    "react-rater": "^5.0.5",
				    "react-router": "^5.0.0",
				    "react-router-dom": "^5.0.0",
				    "react-scripts": "3.0.0",
				    "react-star-rating-component": "^1.4.1"
				  },
				  "scripts": {
				    "start": "PORT=2020 react-scripts start",
				    "build": "react-scripts build",
				    "test": "react-scripts test",
				    "eject": "react-scripts eject"
				  },
				  "eslintConfig": {
				    "extends": "react-app"
				  },
				  "browserslist": {
				    "production": [
				      ">0.2%",
				      "not dead",
				      "not op_mini all"
				    ],
				    "development": [
				      "last 1 chrome version",
				      "last 1 firefox version",
				      "last 1 safari version"
				    ]
				  },
				  "proxy": "http://localhost:2019/"
				}
 

// RUN SERVERS ==============================================================================================
	1. open 2 terminals

	2. cd Eatwise/back-end 			(in the 1st terminal)

	3. node index.js 				(start nodejs server)
	
	4. cd Eatwise/front-end 		(in the 2nd terminal)

	5. npm start 					(start reactjs)


// to change default port, open package.json in client folder then edit the start field
	ex.
		"start": "PORT=5000 react-scripts start"

// http://10.11.114.177:5000/  =  access on local network

// in the event that there is an error in starting both ports used (2019 and 2020) use this command:
	sudo kill `sudo lsof -t -i:2019`
	sudo kill `sudo lsof -t -i:2020`
	// kills the process running on the specified port
	// only do this if the process running on the ports are not important