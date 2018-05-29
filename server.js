/* ------- Backend for Application ------- */

// Node equivalent of importing library, in this case load express, path, jquery, btoa and request
// dotenv helps get enviromental variables
require('dotenv').config()
var express = require('express');
var path = require('path');
var $ = require('jquery');
var btoa = require('btoa');
var request = require('request');
var results = require('./static/js/dataTwo');


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


/* ------- Helper Methods ------- */

function authenticateToken(id) {
    request({
        uri: "https://api.yelp.com/v3/businesses/"+id,
        method: "GET",
        headers: {
                "Authorization":"Bearer " + "S4XcB3erCr3mv3ZsCdnTCpjNXY0vTFo-3E6KCA7fbtQ1XtLPVwJQ7pKxH0EEFuAUCDEqwN67anPUjtxAZwvKnn1CZt9xd9wub7R6CMBXj044MF788sYhdVj12ZoNW3Yx",
            },
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function(errorMessage, response, data) {
            console.log("DATA:", data);
            console.log("ERROR:", errorMessage);
    });
}

function authenticateEachToken(results) {
    results.forEach(function(result) {
        authenticateToken(result.yelpBusinessID)
    });
}


authenticateEachToken(results);
