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
    case "spotify-this-song":
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
    default:
        // Instructions to indicate user what to type on command line 
        instructions()
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

// Write a function to record search results into log.txt
function logToFile(command, input) {
    //   fullCommand.push(command, input)
    fs.appendFile(fileName, ',' + command + "\n" + input, function (err) {
        if (err) {
            return console.log("Error found, but don't panic, it's not fatal")
        }
    })
}

// Write function "concert_this" to search through Bands In Town
function concert_this() {
    if (input === undefined) {
        input = "Bob Dylan"
    }

    Axios.get(`https://rest.bandsintown.com/artists/` + input + `/events?app_id=codingbootcamp`)
        .then(function (response) {
            // Print data to console with console.log
            console.log("_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _");
            console.log(`Lineup: ${response.data[0].lineup}`)
            console.log(`Venue Name: ${response.data[0].venue.name}`)
            console.log(`Venue City: ${response.data[0].venue.city}`)
            console.log(`Venue Name: ${response.data[0].venue.name}`)
            console.log(`Venue Region: ${response.data[0].venue.name}`)
            // Use moment.js to format the date
            console.log(`Show date: ${Moment(response.data[0]).format("MM-DD-YYYY")}`)
            console.log("_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _")
            // Call function logToFile to record search results
            logToFile(command, input);
        });
}

// Write function called "spotify_this" to run spotify search by song title
function spotify_this() {
    console.log(input)
    if (!input) { input = "The Sign" }
    spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].preview_url);
        // Call function logToFile to record search results
        logToFile(command, input);
    });
}

// Write function called "movie_this" to search through OMDB
function movie_this() {
    if (input === undefined) {
        input = "Mr. Nobody"
    }

    Axios.get(`http://www.omdbapi.com/?t=${input}&apikey=59d24f2f`)
        .then(function (response) {
            // Print data to console with console.log
            console.log("_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _");
            console.log(`Title: ${response.data.Title}`)
            console.log(`Year: ${response.data.Year}`)
            console.log(`IMDB Rating: ${response.data.Ratings[0]}`)
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1]}`)
            console.log(`Country: ${response.data.Country}`)
            console.log(`Language: ${response.data.Language}`)
            console.log(`Plot: ${response.data.Plot}`)
            console.log(`Actors: ${response.data.Actors}`)
            console.log("_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _")
            // Call function logToFile to record search results
            logToFile(command, input);
        });
}

function do_what_it_says() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        else {
            var dataArray = data.split(", ");
            command = dataArray[0]
            input = dataArray[1]
            console.log(dataArray, command, input);
            switch (command) {
                case "help":
                    // Call the function for instructions
                    instructions();
                case "concert-this":
                    // Call the function for concert-this. Notice the function name has an underscore instead of hyphen
                    concert_this();
                    break;
                case "spotify-this-song":
                    // Call the function for spotify-this. Notice underscore instead of hyphen
                    spotify_this();
                    break;
                case "movie-this":
                    // Call the funtion movie-this. Notice underscore instead of hyphen
                    movie_this();
                    break;
                default:
                    instructions();
                    break;
            };
        }
    });
}

