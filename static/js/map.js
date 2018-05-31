/* ------- Variable Declarations ------- */

var filteredResults = results;
var searchString = "";
var markers = [];
var infoWindows = [];
var defaultIcon = null;
var highlightedIcon = null;
var map = null;


/* ------- Helper Methods ------- */

function resetResults() {
    // hide all, and remove highlighting
    $(".collapse-expand-result").addClass("hidden");
    $(".result").removeClass("selected");
}

function selectResult($result) {
    // Expand and highlight selected result
    $result.find(".collapse-expand-result").toggle("slide").toggleClass("hidden");
    $result.toggleClass("selected");
}

function closeInfoWindows() {
    infoWindows.forEach(function(infoWindow) {
        infoWindow.close()
    });
}

function resetMarkers() {
    markers.forEach(function(marker) {
        marker.setIcon(defaultIcon);
    });
}


/* ------- Click Handlers ------- */

function toggleSidePanel() {
    $("#search-and-results").toggle("slide");
    $(".collapse-expand-panel").toggleClass("hidden");
}

function showMarker(map, index, marker) {
    closeInfoWindows();
    resetMarkers();
    infoWindows[index].open(map, marker);
    marker.setIcon(highlightedIcon);
}

function showResult(data, event) { 
    var $result = $(event.target).closest(".result");
    var currentClasses = $result.find(".collapse-expand-result").attr("class");
    var wasCollapsed = currentClasses.indexOf("hidden") > -1;
    
    resetResults();
    // if was hidden before, expand now and highlight
    if (wasCollapsed) { selectResult($result); }

    var index = results.findIndex(function(result) {
        var resultID = $result.attr("data-id");
        return result.id == resultID
    });
    var marker = markers[index];
    showMarker(map, index, marker);
}


/* ----- Google Map API Callback Function ----- */

function initMap() {
    // Instantiate Map with Rome as Center
    var rome = {lat: 41.887330, lng: 12.485204};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: rome
    });

    // List of Markers
    markers = filteredResults.map(function(result) {
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
    infoWindows = markers.map(function(marker) {
        var infowWindowContent = $('#info-window-content-0').html();
        return new google.maps.InfoWindow({
            content: '<p class="infowindow-title">' + marker.title + '</p>'
            // content: '<p class="infowindow-title">' + marker.title + '</p>' + '<br>' + '<div class="info-window-content">' + infowWindowContent + '</div>'
        });
    });

    // Click to open Info Window
    markers.forEach(function(marker, index) {
        marker.addListener('click', function() {
            return showMarker(map, index, marker)
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

    highlightedIcon = makeMarkerIcon('FFFF24');
}


/* ---------- View Model ---------- */

function ViewModel(results) {
    var self = this;

    self.searchString = ko.observable('');
    self.showResult = showResult;
    self.filteredResults = ko.computed(function() {
        return results.filter(function(result) {
            return result.name.toLowerCase().indexOf(self.searchString()) !== -1;
        });
    }, self);
}

var viewModel = new ViewModel(results);
ko.applyBindings(viewModel);

function bindEventHandlers() {
    $(".collapse-expand-panel").click(toggleSidePanel);
}

$(document).ready(bindEventHandlers);

