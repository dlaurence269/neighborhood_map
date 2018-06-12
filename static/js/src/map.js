/* ------- Variable Declarations ------- */

let filteredResults = results;
let searchString = "";
let markers = [];
let infoWindows = [];
let defaultIcon = null;
let highlightedIcon = null;
let map = null;

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
    infoWindows.forEach(infoWindow => infoWindow.close())
}

function resetMarkers() {
    markers.forEach(marker => marker.setIcon(defaultIcon))
}

function getYelpData() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8000/yelpReviewData',
        dataType: 'text',
        success: function(data) {
            console.log("GET success");
            const yelpData = JSON.parse(data);
            const newResults = results.map(result => {
                const matchingYelpData = yelpData.find(datum => datum.alias === result.alias);
                const newResult = {...result, ...matchingYelpData};
                return newResult;
            });

            viewModel.results.removeAll();
            newResults.forEach(newResult => viewModel.results.push(newResult));
        },
        error: function(error){
            console.error("Yelp data not loaded", error);
        },
        done: function() {
            // handle error case, i.e. replace '--loading--' with 'Unavailable' or something
        }
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
    const $result = $(event.target).closest(".result");
    const currentClasses = $result.find(".collapse-expand-result").attr("class");
    const wasCollapsed = currentClasses.indexOf("hidden") > -1;
    
    resetResults();
    // if was hidden before, expand now and highlight
    if (wasCollapsed) { selectResult($result); }

    const index = results.findIndex(function(result) {
        const resultID = $result.attr("data-id");
        return result.id == resultID
    });
    const marker = markers[index];
    showMarker(map, index, marker);
}


/* ----- Google Map API Callback Function ----- */

function initMap() {
    // Instantiate Map with Rome as Center
    const rome = {lat: 41.887330, lng: 12.485204};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: rome
    });

    // List of Markers
    markers = filteredResults.map(function(result) {
        const marker = new google.maps.Marker({
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
        const infowWindowContent = $('#info-window-content-0').html();
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
        const markerImage = new google.maps.MarkerImage(
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
    const self = this;

    self.results = ko.observableArray(results);

    self.searchString = ko.observable('');
    self.showResult = showResult;
    self.filteredResults = ko.computed(() => {
        return self.results().filter( result => {
            return result.name.toLowerCase().indexOf(self.searchString()) !== -1;
        });
    }, self);
}

const viewModel = new ViewModel(results);
ko.applyBindings(viewModel);

function preventCollapse(event) {
    event.stopPropagation();
}

function bindEventHandlers() {
    $(".collapse-expand-panel").click(toggleSidePanel);
}

function makeAjaxCalls() {
    getYelpData();
}

function readyPage() {
    bindEventHandlers();
    makeAjaxCalls();
}

$(document).ready(readyPage);
