var keys = require ('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var pullTweets = function(){

 
var client = new Twitter(keys.twitterApiKeys);
 
var params = {screen_name: '@The_TestApp'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	
  	for (var i=0; i < tweets.length; i++){
    	console.log(" ");
    	console.log(tweets[i].created_at);
    	console.log(" ");
    	console.log(tweets[i].text)
    	console.log(" ");
    	console.log(tweets[i].user.screen_name);
    }	
  }
});

}

var getMeSpotify = function(songName){

 
var spotify = new Spotify(keys.spotifyApiKeys);
  //id: "11457a4ae7014110bb034fa0d0b0de6b",
  //secret: "a469770f55b84b00bd7dbda6f5b58427"

 
spotify.search({ type: 'track', query: songName }, function(err,
	 data) {
 if (err) {
    console.log('Error occurred: ' + err);
    return;
  }
 
console.log(data.tracks.items [3]); 
});
}

var movie = function(movieTitle){

request('http://www.omdbapi.com/?apikey=a5e0a2a7&t=' + movieTitle, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
}

var twchange = function(newCommand, altCommand){
	switch(newCommand){
		case 'my-tweets' :
			pullTweets();
			break;
		case 'spotify-this-song' :
			getMeSpotify(altCommand);
			break;
		case 'movie-this':
			movie(altCommand);
			break;
		default:
		console.log('Liri does not understand');
	}
}

var run = function(opt1, opt2){
	twchange(opt1, opt2);
};

var itemName = "" ;
	for (var i=3; i < process.argv.length; i++){
		itemName += process.argv[i] + " " ;

	}
	console.log (itemName);
	 

run(process.argv[2], itemName);