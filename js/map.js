/* --- Side Panel --- */
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

    // Click to close all Info Windows
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
    
    // // Selected marker bounces
    // marker.addListener('click', function() {
    //     marker.setAnimation(google.maps.Animation.BOUNCE);
    //     setTimeout(function(){ marker.setAnimation(null); }, 700);
    // });
      
}


/* ------- View Model ------- */
var ViewModel = function() {
    this.data = ko.observableArray(results);
}


ko.applyBindings(new ViewModel());
