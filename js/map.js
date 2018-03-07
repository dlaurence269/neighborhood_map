/* --- Side Panel --- */
$(document).ready(function(){
    $(".collapse-expand").click(function(){ 
        $("#all-minus").toggle("slide");
        $(".collapse-expand").toggleClass("hidden");
    });
});


/* --- Search Bar --- */
// On keypress search data in array for matches.
// Filter results based on matches.

// convert names and inputs to lowercase before comparing

var substring = "Pantheon";
results.map(function(result) {
    return result.name.indexOf(substring) !==-1;
});


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
