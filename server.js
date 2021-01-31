// Packages and variables
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 8080



//setting up express
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//HTML ROUTES


app.get("/", (require, response) => {
    response.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (require, response) => {
    response.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('*', function(request, response) {
    response.sendFile(path.join(__dirname, '/public/index.html'));
  });

//API ROUTES

/*
-app.get (`/api/notes`) 
    [X]-read the `db.json` file and return all saved notes as JSON
*/

//--------------------------------------------------------------------------
app.get("/api/notes", (require, response) => {
    response.sendFile(path.join(__dirname, "/db/db.json"));
});


//---------------------------------------------------------------------------

/*
-app.post (`/api/notes`) 
    [X]-receive a new note to save on the request body, 
    []-PUSH note to the `db.json` file, and then return the new note to the client.
    []-give each note unique ID when saved
*/

//--------------------------------------------------------------------------
app.post("/api/notes", (require, response) => {
    let newNote = require.body;

    //?.push(newNote);

});


//---------------------------------------------------------------------------


/*
-app.delete (`/api/notes/:id`) receive a query parameter containing the id of a note to delete.
    -need to read all notes from the `db.json` file
    -remove the note with the given `id` property
    -rewrite the notes to the `db.json` file
*/

//--------------------------------------------------------------------------
app.delete("/api/notes/:id", (require,response) => {

});


//---------------------------------------------------------------------------




//setting up simple listen function to see if server is working.
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });

