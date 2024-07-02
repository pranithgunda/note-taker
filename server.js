// Install all required dependencies
const express = require('express');
const path=require('path');

// PORT variable
const PORT = process.env.PORT || 3001;
// app variable to use express methods
const app = express();
// api variable created for routes
const api = require('./routes/index')

// middleware to serve static files from public directory
app.use(express.static('public'));

// get route for the home page
app.get('/',(req,res)=>
res.sendFile(path.join(__dirname,'/public/index.html')))

// get route for the notes page
app.get('/notes',(req,res)=>
res.sendFile(path.join(__dirname,'/public/notes.html')))

// Send all the requests that begin with /api to the index.js in the routes folder
app.use('/api',api);

app.listen(PORT,()=>console.log(`App listening on PORT ${PORT}`));