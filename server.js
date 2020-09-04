// Dependencies
var express = require("express");
var fs = require("fs");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))


//get requests for html and api
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    const data = fs.readFileSync("./db/db.json");
    res.json(JSON.parse(data));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//post & delete requests
app.post("/api/notes", function(req, res) {
    //open the db.json file (readFileSync)
    const data = fs.readFileSync("./db/db.json");
    //then parse and store in a variable:
    const parsedData = res.json(JSON.parse(data));
    var newNote = req.body;
    //push newNote onto array parsed from db.json file
    parsedData.push(newNote);
    //then write to the db.json file (stringify again JSON.stringify(parsedData))
    fs.writeFileSync("db.json", parsedData);
    
});

app.delete("/api/notes/:id", function (req, res) {
    //loop through all the notes to find the one with the unique id to be deleted
    //rewrite all the notes to the db.json file
});


// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});