/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
   const mongoose = require('mongoose')

   /* Connnect to our database */
   // Get the URI of the local database, or the one specified on deployment.
   const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mongo-data'
   
   mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true}); //useIndex = true
   
   module.exports = { mongoose }  // Export the active connection.