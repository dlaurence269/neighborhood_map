/* ------- Map ------- */
function initMap() {
    // Instantiate Map with Rome as Center
    var rome = {lat: 41.887330, lng: 12.485204};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: rome
    });

    // List of Markers
    results.forEach(function(result) {
        var resultName = result.name;
        var resultLat = result.lat;
        var resultLng = result.lng;
        var resultName = {lat: resultLat, lng: resultLng};
        var marker = new google.maps.Marker({
            position: resultName,
            map: map,
            title: resultName // MAKE THIS A STRING!!! 
        });
    })
}

/* ------- View Model ------- */
var ViewModel = function() {
    var self = this;
    self.data = ko.observableArray(results);
}


ko.applyBindings(
    new ViewModel()
);




