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
        var marker = new google.maps.Marker({
            position: {lat: result.lat, lng: result.lng},
            map: map,
            animation: google.maps.Animation.DROP,
            title: result.name
        });
        
        // Info Window
        var infowindow = new google.maps.InfoWindow({
          content: '<p class="infowindow-title">' + result.name + '</p>'
        });
        // Click to open Info Window
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    })    
}


/* ------- View Model ------- */
var ViewModel = function() {
    this.data = ko.observableArray(results);
}


ko.applyBindings(new ViewModel());
