// Packages and variables
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util')
const http = require('http')



//setting up express
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



function handleRequest(request, response) {
    response.end("It Works!! Path Hit: " + request.url);
  }

//get requests to connect index and notes html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


//setting up simple listen function to see if server is working.
const PORT = 8080
// var server = http.createServer(handleRequest);
app.listen(PORT, function() {

    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });

