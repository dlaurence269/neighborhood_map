/* ------- Side Panel ------- */

// Collpase and Expand side-panel
$(document).ready(function(){
    $(".collapse-expand-panel").click(function(){ 
        $("#search-and-results").toggle("slide");
        $(".collapse-expand-panel").toggleClass("hidden");
    });
});

// Collpase and Expand side-panel-results
$(document).ready(function(){
    $(".result").click(function(){ 
        var $result = $(this);
        // Check if selected result already had the hidden class
        // (which means it was already collapsed)
        var currentClasses = $result.find(".collapse-expand-result").attr("class");
        // Save as a boolean
        var wasCollapsed = currentClasses.indexOf("hidden") > -1;
        // hide all, and remove highlighting
        $(".collapse-expand-result").addClass("hidden");
        $(".result").removeClass("selected");
        // if was hidden before, expand now and highlight
        if (wasCollapsed) {
            $result.find(".collapse-expand-result").toggle("slide").toggleClass("hidden");
            $result.toggleClass("selected");
        }
    });
});


/* ------- Search Bar ------- */

// Default search value is blank.
// Default list of results is all results.
var searchString = "";
var filteredResults = results;


/* ---------- Map ---------- */

function initMap() {
    // Instantiate Map with Rome as Center
    var rome = {lat: 41.887330, lng: 12.485204};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: rome
    });

    // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = null;

    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');

    // List of Markers
    var markers = filteredResults.map(function(result) {
        var marker = new google.maps.Marker({
            position: {lat: result.lat, lng: result.lng},
            map: map,
            animation: google.maps.Animation.DROP,
            title: result.name
        });
        defaultIcon = marker.getIcon();
        return marker;
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

    // Loop to reset all markers to default
    function resetMarkers() {
        markers.forEach(function(marker) {
            marker.setIcon(defaultIcon);
        });
    }

    // Click to open Info Window
    markers.forEach(function(marker, index) {
        marker.addListener('click', function() {
            closeInfoWindows();
            resetMarkers();
            infoWindows[index].open(map, marker);
            marker.setIcon(highlightedIcon);
        });
    });

    // This function takes in a COLOR, and then creates a new marker
    // icon of that color. The icon will be 21 px wide by 34 high, have an origin
    // of 0, 0 and be anchored at 10, 34).
    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21,34)
        );
        return markerImage;
    }
}


/* ---------- View Model ---------- */

var ViewModel = function() {
    self = this;
    self.data = ko.observableArray(filteredResults);
    self.filter = ko.computed(
        // Filter results based on matches.
        // function filterResults(searchString) {
            function() {
            // Update search string by typing in the search bar.
            // searchString = $("#searchbar").val().toLowerCase();
            // Check lowercase search string against lowercase results.
            filteredResults = results.filter(function(result) {
                return result.name.toLowerCase().indexOf(searchString) !==-1;
            });
            // Reinitiate map with filtered results.
            // initMap();
        }
    );
}


ko.applyBindings(new ViewModel());
