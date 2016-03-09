var geocoder = new google.maps.Geocoder();

showMap = function(address, element) {
  geocoder.geocode( { 'address': address}, function(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
    var latitude = results[0].geometry.location.lat();
    var longitude = results[0].geometry.location.lng();
    initialize(latitude,longitude, element);
  }
  });
}

function initialize(latitude,longitude, element) {
  var latlng = new google.maps.LatLng(latitude,longitude);
  var myOptions = {
    zoom: 16,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false
  };
  var map = new google.maps.Map(element,myOptions);

  var marker = new google.maps.Marker({
    position: latlng,
  });

  marker.setMap(map);
}
