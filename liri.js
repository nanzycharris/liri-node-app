// Require and install node-spotify-api package
var Spotify = require('node-spotify-api');

// Require and install axios package
var Axios = require('axios');

// Require and install moment package
var Moment = require('moment');

// The following reads and sets any environment variables with the dotenv package:
require("dotenv").config();

// Import the keys.js file and store it in a variable.
var keys = require("./keys.js");

// This variable allows you to access your keys information -- notice spotify starts with lowercase
var spotify = new Spotify(keys.spotify);

// Require and install fs package -- File System
var fs = require('fs');

// Variable for log.txt to keep a record of search results
var fileName = 'log.txt';
var fullCommand = [];

// Code to indicate which arguments (input in command line) to use when running in terminal
let command = process.argv[2];
let input = process.argv[3];


// Add switch commands - switch is a keyword, not a variable or function
switch (command) {
    case "help":
        // Call the function for instructions
        instructions();
    case "concert-this":
        // Call the function for concert-this. Notice the function name has an underscore instead of hyphen
        concert_this();
        break;
    case "spotify-this":
        // Call the function for spotify-this. Notice underscore instead of hyphen
        spotify_this();
        break;
    case "movie-this":
        // Call the funtion movie-this. Notice underscore instead of hyphen
        movie_this();
        break;
    case "do-what-it-says":
        do_what_it_says();
        break;
    case "default":
        // Instructions to indicate user what to type on command line 
        console.log("Type any of the following commands after \"node liri.js:\" " +
            "\n" + "concert-this 'artist/band name' " +
            "\n" + "spotify-this 'song title' " +
            "\n" + "movie-this 'movie title' " +
            "\n" + "do-what-it-says ");
        break;
};

//  Write a function to explain instructions to user
function instructions() {
    console.log("Type any of the following commands after \"node liri.js:\" " +
        "\n" + "concert-this 'artist/band name' " +
        "\n" + "spotify-this 'song title' " +
        "\n" + "movie-this 'movie title' " +
        "\n" + "do-what-it-says ");
}

function logToFile(value) {
    fs.appendFile(fileName, ',' + value, function (err) {
        if (err) {
            return console.log("Error found, but don't panic, it's not fatal")
        }
    })
}

logToFile(fullCommand);

function concert_this() {

}

// Write function called spotify_this to run spotify search by song title
function spotify_this() {
    if (!input) { input = "The Sign Ace of Base" }
    spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].artist.name)
    });
}



