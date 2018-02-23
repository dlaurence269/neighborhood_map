/* - Side Panel - */
$(document).ready(function(){
    $(".collapse-expand").click(function(){ 
        $("#all-minus").toggle("slide");
        $(".collapse-expand").toggleClass("hidden");
    });
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
    results.forEach(function(result) {
        new google.maps.Marker({
            position: {lat: result.lat, lng: result.lng},
            map: map,
            title: result.name
        });
    })

    // Info Window
    var contentString = "Is there anybody out there?";
    var piazzaVenezia = {lat: 41.895868, lng: 12.482558};
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
        position: piazzaVenezia,
        map: map,
        title: "Piazza Venezia"
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}


/* ------- View Model ------- */
var ViewModel = function() {
    this.data = ko.observableArray(results);
}


ko.applyBindings(new ViewModel());
