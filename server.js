// Dependencies
var express = require("express");
var fs = require("fs");
var path = require("path");
var { v4: uuidv4 } = require("uuid");

// Sets up the Express App
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

//var data = fs.readFileSync("./db/db.json");

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

let newId = 0
//post & delete requests
app.post("/api/notes", function(req, res) {
    //open the db.json file (readFileSync)
    const data = fs.readFileSync("./db/db.json");
    //then parse and store in a variable:
    const parsedData = JSON.parse(data);
    
    var newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    console.log(newNote);
    
    
    //push newNote onto array parsed from db.json file
    parsedData.push(newNote);
    
    //then write to the db.json file (stringify again JSON.stringify(parsedData))
    fs.writeFileSync("./db/db.json", JSON.stringify(parsedData));
    
});

app.delete("/api/notes/:id", function (req, res) {
    //open the db.json file (readFileSync)
    const data = fs.readFileSync("./db/db.json");
    const parsedData = JSON.parse(data);
    //loop through all the notes to find the one with the unique id to be deleted
    //data.forEach()
    var deleteData = req.params.id;
    console.log(deleteData);
    for (i=0; i<parsedData.length; i++) {
        console.log(parsedData[i])
        if (deleteData === parsedData[i].title) {
            parsedData.splice(i, 1)
        };
    };
    //rewrite all the notes to the db.json file
    fs.writeFileSync("./db/db.json", JSON.stringify(parsedData));
});


// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});