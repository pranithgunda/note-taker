// Install all required dependencies
const express = require('express');

// variables created for routes to api and html
const apiRoutes = require('./routes/apiroutes')
const htmlRoutes = require('./routes/htmlroutes')


// PORT variable
const PORT = process.env.PORT || 3001;
// app variable to use express methods
const app = express();

// middleware for parsing json and url encoded form data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// middleware to serve static files from public directory
app.use(express.static('public'));

// Send all the requests that begin with /api to the apiroutes in the routes folder
app.use('/api',apiRoutes);
// Send all the requests with base URL to htmlroutes in the routes folder 
app.use('/',htmlRoutes);

app.listen(PORT,()=>console.log(`App listening on PORT ${PORT}`));