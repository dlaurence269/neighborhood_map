/* ------- Variable Declarations ------- */
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
            const yelpData = JSON.parse(data);
            const newResults = results.map(result => {
                // Get matching yelp data set
                const matchingYelpData = yelpData.find(datum => datum.alias === result.alias);
                // Merge yelp properties to result
                const newResult = {...result, ...matchingYelpData};
                // Return newly merged result object
                return newResult;
            });

            // Knockout doesn't track object changes inside an array
            // so I have to remove them all and push new ones
            viewModel.results.removeAll();
            newResults.forEach(newResult => viewModel.results.push(newResult));
        },
        error: function(error){
            console.error("Yelp data not loaded", error);
        }
    });
}

/* ------- Click Handlers ------- */
function preventCollapse(event) {
    event.stopPropagation();
}

function toggleSidePanel() {
    $("#search-and-results").toggle("slide");
    $(".collapse-expand-panel").toggleClass("hidden");
}

function showMarker(map, index, marker, triggerSideBarHighlightFromMarker) {
    closeInfoWindows();
    resetMarkers();
    infoWindows[index].open(map, marker);
    marker.setIcon(highlightedIcon);
    if (triggerSideBarHighlightFromMarker) {
        showResultFromMarker(index);
    }
}

function showResultFromMarker(index){
    const $result = $($('#results').find('.result')[index]);
    const triggerSideBarHighlightFromMarker = false;
    showResult($result, triggerSideBarHighlightFromMarker);
}

function showResultFromSideBar(data, event) {
    const $result = $(event.target).closest(".result");
    const triggerSideBarHighlightFromMarker = false;
    showResult($result, triggerSideBarHighlightFromMarker);
}

function showResult($result, triggerSideBarHighlightFromMarker) { 
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
    showMarker(map, index, marker, triggerSideBarHighlightFromMarker);
}


/* ----- Google Map API Callback Function ----- */
function populateInfoWindows() {
    infoWindows = results.map(function(result, index) {
        const $infoWindow = $('#access-details_' + index);

        let content = 
            `<div class="info-window-title-line">
                <img class="img-thumb" alt="${result.name}" src="${result.imageURL}">
                <h4>${result.name}</h4>
            </div>
            `;
        
        if ($infoWindow.length) {
            content = content +
                `<div class="info-window-details">
                    <div>${$infoWindow.html()}
                </div>`;
        }

        return new google.maps.InfoWindow({ content: content });
    });
}
function initMap() {
    // Instantiate Map with Rome as Center
    const rome = {lat: 41.887330, lng: 12.485204};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: rome
    });

    // List of Markers
    markers = results.map(function(result) {
        const marker = new google.maps.Marker({
            position: {lat: result.lat, lng: result.lng},
            map: map,
            animation: google.maps.Animation.DROP,
            title: result.name
        });
        defaultIcon = marker.getIcon();
        return marker;
    });

    // Click to open Info Window
    markers.forEach(function(marker, index) {
        marker.addListener('click', function() {
            const triggerSideBarHighlightFromMarker = true;
            return showMarker(map, index, marker, triggerSideBarHighlightFromMarker);
        });
    });

    // Like I said above, Knockout doesn't track object
    // changes inside an array so I have to remove them all
    // and push new ones
    viewModel.markers.removeAll();
    markers.forEach(marker => viewModel.markers.push(marker));

    // Populate info window content from generated KO view
    populateInfoWindows();

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
function ViewModel(results, markers) {
    const self = this;

    self.results = ko.observableArray(results);
    self.markers = ko.observableArray(markers);
    self.searchString = ko.observable('');
    self.showResultFromSideBar = showResultFromSideBar;
    self.filteredResults = ko.computed(() => {
        return self.results().filter( result => {
            return result.name.toLowerCase().indexOf(self.searchString()) !== -1;
        });
    }, self);
    self.filterMarkers = ko.computed(() => {
        self.results().map((result,index) => {
            const resultIsPresent = self.filteredResults().find(filteredResult => {
                return filteredResult.name === result.name;
            });
            const visible = !!resultIsPresent;
            const marker = self.markers()[index];
            if (marker) marker.setVisible(visible);
            return marker;
        })
    }, self);
}

const viewModel = new ViewModel(results, markers);
ko.applyBindings(viewModel);

function starsForRating(rating) {
    if (rating) {
        const maxStars = 5;
        const filled = Math.floor(rating);
        const half = rating - filled > 0 ? 1 : 0;

        const stars = [];
        for(let i = 0; i < filled; i++) {
            stars.push('fa-star');
        }
        if (half) stars.push('fa-star-half');

        return stars;
    }
}

/* ------- Setup ------- */
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
