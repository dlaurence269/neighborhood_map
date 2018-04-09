/* ------- Variable Declarations ------- */

var twitterConsumerKey = "VpuOze8qyzJNSC9QBTBN0sAdO";
var twitterConsumerSecret = "BW9yR0oqLvpD1gatSTWTlNRacWmiOINnMufw9S7QpKwgOBvM4s";


/* ------- Helper Methods ------- */

function encodeTwitterCredentials(key, secret) {
    return btoa(key + ":" + secret);
}

function getTwitterAccessToken() {
    $.ajax({
        type: 'POST',
        url: "https://api.twitter.com/oauth2/token",
        headers: {
            "Authorization":"Basic " + encodeTwitterCredentials(twitterConsumerKey, twitterConsumerSecret),
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: {
            grant_type: "client_credentials"
        }
    })
    .success(function(data) { 
        console.log(data);
    })
    .error(function() {
        console.log("error");
    });
}
