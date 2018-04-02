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
