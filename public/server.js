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
var notes = []

//html routes for index and notes
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
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


// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});