# liri-node-app
Node application to be run on the terminal through command line 

LIRI is a Language Interpretation and Recognition Interface. This is a command line Node.js app that takes in parameters and returns data.

The following commands allow you to use liri.js:

1) concert-this
CLI: node liri.js concert-this <artist/band name here>

This is a search from the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events,?app_ids=codingbootcamp") for an artist, and renders the following information about each event to the terminal:
Name of the venue
Venue location
Date of the Event (use moment to format this as "MM/DD/YYYY")

2) spotify-this-song
CLI: node liri.js spotify-this-song '<song name here>'

This pulls up the following information about the song in your terminal/bash window:
Artist(s)
The song's name
A preview link of the song from Spotify
The album in which that song was included

3) movie-this
CLI: node liri.js movie-this '<movie name here>'

This brings the following information to your terminal/bash window:
Title of the movie.
Year the movie came out.
IMDB Rating of the movie.
Rotten Tomatoes Rating of the movie.
Country where the movie was produced.
Language of the movie.
Plot of the movie.
Actors in the movie.

4) do-what-it-says
CLI: node liri.js do-what-it-says

Using the fs Node package, LIRI takes the text inside of random.txt and then uses it to call one of LIRI's commands.
It runs spotify-this-song for "I Want it That Way," as it's specificed in random.txt.
