/* ------- Backend for Application ------- */

// Node equivalent of importing library, in this case load express, path, jquery, btoa etc.
// dotenv helps get enviromental variables
require('dotenv').config()
var express = require('express');
var path = require('path');
var request = require('request');
var results = require('./static/js/data');


var app = express();
var port = 8000;
var allData = [];
var test = [
    { "alias": "accademia-di-francia-villa-medici-roma", "rating": 4.5, "review_count": 10, yelpURL: "#" },
    { "alias": "pantheon-basilica-di-santa-maria-ad-martyres-roma", "rating": 4.5, "review_count": 357, yelpURL: "#" },
    { "alias": "basilica-di-san-pietro-roma-4", "rating": 5, "review_count": 350, yelpURL: "#" },
    { "alias": "cappella-sistina-roma", "rating": 4.5, "review_count": 113, yelpURL: "#" },
    { "alias": "colosseo-roma", "rating": 4.5, "review_count": 801, yelpURL: "#" }
];

app.listen(port, function () {
    console.log(`Neighborhood app listening on port ${port}!`);
})

// Enable access to style files within static directory
app.use(express.static('static'))


app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/yelpReviewData', function (request, response) {
    console.log("GET request to /yelpReviewData made. Returning yelp data:", test);
    response.send(test);
});


/* ------- Helper Methods ------- */

function authenticateToken(location) {
    // FIXME what to do with missing alias
    var yelpBusinessID = [location.alias, location.queryString].join("?");
    request({
        uri: "https://api.yelp.com/v3/businesses/" + yelpBusinessID,
        method: "GET",
        headers: {
                "Authorization":"Bearer " + process.env.YELP_ACCESS_TOKEN,
            },
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function(errorMessage, response, data) {
        if(errorMessage) {
            console.error(errorMessage, "Yelp data not fetched.");
        } else {
            json = JSON.parse(data);
            // rename alias to yelpBusinessID
            // rename url to yelpURL
            console.log(json.alias, json.rating, json.review_count, json.url);
            return json;
        }
            
    });
}

function authenticateEachToken(results) {
    var allData = results.map(function(result) {
        var yelpData = authenticateToken(result);
        console.log("yelpData: ", yelpData);
        return yelpData;
    });
    console.log("allData: ", allData);
    return allData;
}

var allData = authenticateEachToken(results);
console.log(allData);
