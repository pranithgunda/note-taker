// Install all required dependencies
const express = require('express');
const path=require('path');

// PORT variable
const PORT = process.env.PORT || 3001;
// app variable to use express methods
const app = express();

// middleware to serve static files from public directory
app.use(express.static('public'));

// to fetch index.html file as home page
app.get('/',(req,res)=>
res.sendFile(path.join(__dirname,'/public/index.html')))

// to fetch notes.html file
app.get('/notes',(req,res)=>
res.sendFile(path.join(__dirname,'/public/notes.html')))

app.listen(PORT,()=>console.log(`App listening on PORT ${PORT}`));