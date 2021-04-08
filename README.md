## Pull the project repo
git clone https://github.com/onojaMatthew/groove-assessment.git

## The application entry point
The entry point point of the application is: server.js

## Route entry file
The routes can be found in apis folder but the entry route for all router is located inside middleware/routes.js

## Database configuration
The database used in this application is MongoDB
The configuration file is located inside config/db.js

`Note:` Ensure you change the database url in this found to a new url as this might not be available at this point.

### the application is made of two parts: client and server application.

The client application is built using ReactJS and can be found in the folder called: gare-client

## Running the client application
First install all dependencies by:
  1. cd gare-client
  2. npm install or yarn install

then, npm start or yarn start

## Adding environment variables to the client application
Create a .env file in the root directory of gare-client folder
The environment variable names can be found in key.js file inside the helper folder right inside gare-client folder

After the variables have been set, run the React Application using npm start or yarn start

## Running the server application
First clone the application using the git repository as above
Open the project in your preferred Code Editor.
In the root directory, run npm install or yarn install to install all dependencies

## Add environment variables to the server application
Create a .env file in the root of gare-finance folder.
Open key.js located inside config folder to see the environment variable names and create them in the .env file created in the last step

Make sure all variables as found in key.js file are duely created in the .env file to avoid errors






