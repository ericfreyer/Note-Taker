// Packages and variables
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
var PORT = process.env.PORT || 8080;

//setting up express
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//HTML ROUTES================================================================


app.get("/", (require, response) => {
    response.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (require, response) => {
    response.sendFile(path.join(__dirname, "/public/notes.html"));
});

//API ROUTES==================================================================

/*
-app.get (`/api/notes`) 
    [X]-read the `db.json` file and return all saved notes as JSON
*/

//============================================================================


app.get("/api/notes", (require, response) => {
    response.sendFile(path.join(__dirname, "/db/db.json"));
});


//============================================================================
/*
-app.post (`/api/notes`) 
    [X]- read function
    [X]- write function
    [X]-receive a new note to save on the request body, 
    [X]-PUSH note to the `db.json` file, and then return the new note to the client.
    [X]-give each note unique ID when saved
*/
//============================================================================
const readNote = () => {
    const noteText = JSON.parse
        (fs.readFileSync
            (path.join(__dirname, '/db/db.json'))
        );
    return noteText;
}
const writeNote = function (noteText) {
    fs.writeFileSync
        (path.join(__dirname, '/db/db.json'), 
        JSON.stringify(noteText), 
        function (err) {
        if (err) return ({ err });
    })
}

app.post("/api/notes", (require, response) => {
    let newNote = require.body;
    let noteArry = readNote();
    newNote.id = uuidv4();
    console.log(uuidv4());
    noteArry.push(newNote);
        writeNote(noteArry);
        return response.json(noteArry)
});


//============================================================================

/*
-app.delete (`/api/notes/:id`) receive a query parameter containing the id of a note to delete.
    [X]READ all notes from the `db.json` file
    [X]remove the note with the given `id` property
    [X]WRITE the notes to the `db.json` file
*/

//============================================================================
app.delete("/api/notes/:id", (require,response) => {
    fs.readFile("db/db.json", function(error, data) {
    let noteId = require.params.id;
    let noteData = JSON.parse(data);
    noteData = noteData.filter(function(note) {
        if (noteId != note.id) {
          return true;
        } else {
          return false;
        };
    }); 
    fs.writeFile("db/db.json", JSON.stringify(noteData), function(error){
      if (error)
      throw error;
      response.end(console.log("Note Deleted!"));
    })
  });

});
//============================================================================
//setting up simple listen function to see if server is working.
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });

