// Dependencies
var express = require("express");
var fs = require("fs");

// Sets up the Express App
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Note input data
var notes = [
    {
        routeName: "note",
        uniqueID: "42"
    },
]

//html routes for index and notes
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//create api routes
app.get("/api/notes", function(req, res) {
    return res.json(notes);
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {
    //loop through all the notes to find the one with the unique id to be deleted
    //rewrite all the notes to the db.json file
});


// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});