/* ------- Backend for Application ------- */

// Node equivalent of importing library, in this case load express, path, jquery, btoa etc.
// dotenv helps get enviromental constiables
require('dotenv').config()
const express = require('express');
const path = require('path');
const request = require('request-promise');
const results = require('./static/js/compiled/data');

const app = express();
const port = 8000;

/* ------- Configuration ------- */
app.listen(port, function () {
    console.log(`Neighborhood app listening on port ${port}!`);
});

// Enable access to style files within static directory
app.use(express.static('static'));

// Default route to index.html file
app.get('/', function (request, response, next) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

/* ------- REST Endpoints ------- */
app.get('/yelpReviewData', function (request, response) {
    console.log("GET request to /yelpReviewData made");

    fetchAllYelpDetails(results).then(all => {
        console.log("Fetching successful.");
        response.send(all);
    }).catch(function(error) {
        console.error("Fetching failed for endpoint '/yelpReviewData'.", error);
        next(error);
    });
});


/* ------- Helper Methods ------- */

function fetchYelpDetail(location) {
    const yelpBusinessID = [location.alias, location.queryString].join("?");
    return request({
        uri: "https://api.yelp.com/v3/businesses/" + yelpBusinessID,
        method: "GET",
        headers: {
            "Authorization":"Bearer " + process.env.YELP_ACCESS_TOKEN,
        },
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    });
}

async function fetchAllYelpDetails(results) {
    async function fetchOne(result) {
        return await fetchYelpDetail(result).then(function(data) {
            const json = JSON.parse(data);
            return {
                alias: json.alias,
                rating: json.rating,
                review_count: json.review_count,
                yelpURL: json.url
            };
        }).catch(function(error) {
            console.error("Yelp data not fetched.", error.message);
            // We return an empty object so that an empty object shows up in the
            // results to the front end
            return {};
        });
    }
    return await Promise.all(results.map(fetchOne));
}