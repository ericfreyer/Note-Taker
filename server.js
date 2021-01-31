// Packages and variables
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util')
const http = require('http')
const PORT = 8080


//setting up express
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//get requests to connect index and notes html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


//setting up simple listen function to see if server is working.
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });

