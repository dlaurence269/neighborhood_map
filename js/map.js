/* ------- Map ------- */
function initMap() {
    // Instantiate Map with Rome as Center
    var rome = {lat: 41.887330, lng: 12.485204};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: rome
    });

    // List of Markers
    var Pantheon = {lat: 41.898834, lng: 12.477452};
    var marker = new google.maps.Marker({
        position: Pantheon,
        map: map,
        title: 'Pantheon'
    });
    var Colesseum = {lat: 41.890282, lng: 12.492660};
    var marker = new google.maps.Marker({
        position: Colesseum,
        map: map,
        title: 'Colesseum'
    });
    var CatacombsofStCallixtus = {lat: 41.861008, lng: 12.509137};
    var marker = new google.maps.Marker({
        position: CatacombsofStCallixtus,
        map: map,
        title: 'Catacombs of St. Callixtus'
    });

    results.forEach(function(result) {
    console.log(result);
});
}


/* ------- View Model ------- */
var ViewModel = function() {
    var self = this;
    self.data = ko.observableArray(results);
}


ko.applyBindings(
    new ViewModel()
);




