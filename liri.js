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
var fs = require('fs')

// Code to indicate which arguments (input in command line) to use when running in terminal
let command = process.arg[2];
let input = process.arg[3];

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
        console.log("\n" + "Type any of the following commands after node liri.js: " + "\n" +
            "concert-this 'artist/band name' " + "\n"
            "spotify-this 'song title' " + "\n"
            "movie-this 'movie title' " + "\n"
            "do-what-it-says " + "\n");
};


