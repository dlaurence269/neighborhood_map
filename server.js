/* ------- Backend for Application ------- */

// Node equivalent of importing library, in this case load express, path, jquery, btoa and request
// dotenv helps get enviromental variables
require('dotenv').config()
var express = require('express');
var path = require('path');
var $ = require('jquery');
var btoa = require('btoa');
var request = require('request');

var app = express();
var port = 8000;

// Listen on port, console.log is just to tell the reader what port that is
app.listen(port, function () {
  console.log(`Neighborhood app listening on port ${port}!`);
})

// Enable access to style files within static directory
app.use(express.static('static'))


app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
})


/* ------- Variable Declarations ------- */

var twitterConsumerKey = "VpuOze8qyzJNSC9QBTBN0sAdO";
var twitterConsumerSecret = "BW9yR0oqLvpD1gatSTWTlNRacWmiOINnMufw9S7QpKwgOBvM4s";
var accessToken = "";


/* ------- Helper Methods ------- */

function encodeTwitterCredentials(key, secret) {
    return btoa(key + ":" + secret);
}

function getTwitterAccessToken() {
    request({
        uri: "https://api.twitter.com/oauth2/token",
        method: "POST",
        headers: {
                "Authorization":"Basic " + encodeTwitterCredentials(twitterConsumerKey, twitterConsumerSecret),
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
        form: {
            grant_type: "client_credentials",
        }
    }, function(errorMessage, response, data) {
            console.log("ERROR:", errorMessage);
            var json = JSON.parse(data);
            accessToken = json["access_token"];
            authenticateToken();
    });
}

function authenticateToken() {
    request({
        uri: "https://api.twitter.com/1.1/search/tweets.json?q=%23pantheon&geocode=41.887330,12.485204,5km&include_entities=true&count=1",
        method: "GET",
        headers: {
                "Authorization":"Bearer " + "AAAAAAAAAAAAAAAAAAAAAAbb5QAAAAAAZCQzE%2FCOpxjxLgS0sp7l7l2wYKY%3DvVMkUZXLnJ1ssT4ueL1OyY7CV7OjkZkemuhS6spJuusEAuRexX",
            },
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function(errorMessage, response, data) {
            console.log("DATA:", data);
            console.log("ERROR:", errorMessage);
    });
}

getTwitterAccessToken();
