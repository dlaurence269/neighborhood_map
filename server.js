/* ------- Backend for Application ------- */

// Node equivalent of importing library, in this case load express, path, jquery, btoa etc.
// dotenv helps get enviromental variables
require('dotenv').config()
var express = require('express');
var path = require('path');
var $ = require('jquery');
var btoa = require('btoa');
var request = require('request');
var results = require('./static/js/data');


var app = express();
var port = 8000;
var allData = [];
var test = [{"abv":"7","category":{"id":1,"name":"IPA"},"description":"Intense hoppy flavor, only for the cold and bitter at heart. Best served chilled.","ibu":"90","id":1,"name":"Hoppy Bastard","price":"$5.00"},{"abv":"5","category":{"id":1,"name":"IPA"},"description":"Very hoppy and flavorfull aromatics, with medium hoppy flavor. Mid-range alcohol level, easily approachable IPA.","ibu":"40","id":2,"name":"IPA lot when I drink Beer","price":"$2.00"},{"abv":"6","category":{"id":1,"name":"IPA"},"description":"Classic IPA. If you're trying for the first time, this is the most typical IPA around.","ibu":"50","id":3,"name":"IPA IPA IPA","price":"$3.00"},{"abv":"6","category":{"id":1,"name":"IPA"},"description":"If you want an IPA to get pumped about, this is it. Enjoy The best IPA around!","ibu":"60","id":4,"name":"Yippie Aye Yay IPA!","price":"$3.00"},{"abv":"5","category":{"id":1,"name":"IPA"},"description":"This complex mix of smokey, hoppy, curtness will blow you away. No better beer here.","ibu":"50","id":5,"name":"Boring IPA, NOT Today","price":"$2.50"},{"abv":"4.4","category":{"id":2,"name":"Lager"},"description":"America's not oldest brewery makes the yes freshest lager around.","ibu":"12","id":6,"name":"YingYing Lager","price":"$1.00"},{"abv":"5","category":{"id":2,"name":"Lager"},"description":"With a lager this good, you'd be bragging as well.","ibu":"15","id":7,"name":"Bragger Lager","price":"$1.50"},{"abv":"4.5","category":{"id":2,"name":"Lager"},"description":"For those hardworking, blue collar, strong folk. There's nothing better.","ibu":"12","id":8,"name":"Logger Lager","price":"$1.00"}]

// Listen on port, console.log is just to tell the reader what port that is
app.listen(port, function () {
    console.log(`Neighborhood app listening on port ${port}!`);
})

// Enable access to style files within static directory
app.use(express.static('static'))


app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/ajaxURL', function (request, response) {
    response.send(test);
});


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
            console.log("ERROR:", errorMessage);
            console.log("RESPONSE: Too long to print!");
            console.log("DATA: Too long to print!");
            return data;
    });
}

function authenticateEachToken(results) {
    var allData = results.map(function(result) {
        var yelpData = authenticateToken(result.yelpBusinessID);
        console.log("yelpData: ", yelpData);
        return yelpData;
    });
    console.log("allData: ", allData);
    return allData;
}

authenticateEachToken(results);
console.log(allData);
