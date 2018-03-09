/* --- Side Panel --- */
$(document).ready(function(){
    $(".collapse-expand").click(function(){ 
        $("#search-and-results").toggle("slide");
        $(".collapse-expand").toggleClass("hidden");
    });
});


/* --- Search Bar --- */
// Convert names and inputs to lowercase before comparing
// .toLowerCase()

// Update search string by typing in the search bar.
// Default value is blank.
var searchString = "";
var filteredResults = results;

// Filter results based on matches.
function filterResults() {
    console.log(searchString);
    filteredResults = results.filter(function(result) {
        return result.name.indexOf(searchString) !==-1;
    });
    console.log(filteredResults);
}


/* ------- Map ------- */
function initMap() {
    // Instantiate Map with Rome as Center
    var rome = {lat: 41.887330, lng: 12.485204};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: rome
    });

    // List of Markers
    var markers = filteredResults.map(function(result) {
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
    this.data = ko.observableArray(filteredResults);
}


ko.applyBindings(new ViewModel());
