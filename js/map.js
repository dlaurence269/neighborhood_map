/* --- Side Panel --- */
$(document).ready(function(){
    $(".collapse-expand").click(function(){ 
        $("#search-and-results").toggle("slide");
        $(".collapse-expand").toggleClass("hidden");
    });
});


/* --- Search Bar --- */
// Convert names and inputs to lowercase before comparing

// Update search string by typing in the search bar.
// Default value is blank.
var searchString = "";
function changeSearchString() {
    var searchString = document.getElementById("searchbar");
}

// Returns True or False for each result in results
// if the search string is found in the name.
results.map(function(result) {
    return result.name.indexOf(searchString) !==-1;
});

// Filter results based on matches.
// var sample = [1, 2, 3]
// var displayNewResults = sample.filter(function(elem){
//     return elem !== 2;
// })
// console.log(displayNewResults)

/* ------- Map ------- */
function initMap() {
    // Instantiate Map with Rome as Center
    var rome = {lat: 41.887330, lng: 12.485204};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: rome
    });

    // List of Markers
    var markers = results.map(function(result) {
        return new google.maps.Marker({
            position: {lat: result.lat, lng: result.lng},
            map: map,
            animation: google.maps.Animation.DROP,
            title: result.name
        });
    });
        
    // List of Info Windows
    var infoWindows = markers.map(function(marker) {
        return new google.maps.InfoWindow({
            content: '<p class="infowindow-title">' + marker.title + '</p>'
        });
    });

    // Loop to close all Info Windows
    function closeInfoWindows() {
        infoWindows.forEach(function(infoWindow) {
            infoWindow.close()
        });
    }

    // Click to open Info Window
    markers.forEach(function(marker, index) {
        marker.addListener('click', function() {
            closeInfoWindows();
            infoWindows[index].open(map, marker);
        });
    });
}


/* ------- View Model ------- */
var ViewModel = function() {
    this.data = ko.observableArray(results);
}


ko.applyBindings(new ViewModel());
