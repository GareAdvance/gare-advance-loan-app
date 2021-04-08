const mongoose = require( "mongoose" );
const winston = require( "winston" );
require( "dotenv" ).config();
const key = require("../config/key")

let db_url;
const env = process.env.NODE_ENV || 'development';
if ( env === "development" ) {
  // Create a mongodb atlas account and replace the url with the one here.
  db_url = `mongodb+srv://${key.mongouser}:${key.mongopassword}@ticket.6z9ee.mongodb.net/${key.mongodb}?retryWrites=true&w=majority`;
} else {
  // Create a mongodb atlas account and replace the url with the one here.
  db_url = `mongodb+srv://${key.mongouser}:${key.mongopassword}@ticket.6z9ee.mongodb.net/${key.mongodb}?retryWrites=true&w=majority`;
}

module.exports = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect( db_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    poolSize: 5,
    socketTimeoutMS: 45000,
  } )
    .then( () => {
      winston.info( "Connection to database established" );
    } )
    .catch( err => {
      winston.error( `Connection failed. ${ err.message }` );
    } );
}