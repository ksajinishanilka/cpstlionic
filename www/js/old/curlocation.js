 var markers = [];
function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 9
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };


          /*  var infowindow = new google.maps.InfoWindow({
          content: "current location"
        });

        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'CPSTL'
        });
        marker.addListener('click', function() {
          infowindow.open(pos, marker);
        });

            //infoWindow.setPosition(pos);
            //infoWindow.setContent(content);*/
            map.setCenter(pos);
            //print_r(pos);
             markers = [];
            callAjaxRequest(map,pos.lat,pos.lng,100);
             

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }


function callAjaxRequest(map,lat,lng,dist){
        var url ="http://localhost/group2/distance-route-cpstl/responsive/handlers/databasehandler.php";
        console.log(lat+":"+lng);
        
        $.get(
            url,
            {
                task:"stationsaroundpoint",
                lat:lat,
                lng:lng,
                dist:dist
            },
            function(data){
                try{
                    var stations = JSON.parse(data);//[routeid,infojson,distance]
                    console.log(stations);

                    for (var i = 0; i < stations.length; i++) {
                     
                       var station = stations[i];
                       
                        var location = new google.maps.LatLng(station.lat,station.lng);

                        createMarker(map,location, station.name, station.address,station.contact,station.type);
                    }
                }catch (err){
                    stations = null;
                }

        });
    }

        function createMarker(map,latlng, name, address,contact,type) {
            var station_details = "<b>" + name + "</b> <br/>" + address + "</b> <br/>" + contact + "</b> <br/>" + type + "</b> <br/>" + '<button onclick="myFunction()">Products</button>';
       
            var marker = new google.maps.Marker({
              map: map,
              position: latlng
            });

            var infoWindow = new google.maps.InfoWindow({
          content: " "
        });

            google.maps.event.addListener(marker, 'click', function() {
              infoWindow.setContent(station_details);
              infoWindow.open(map, marker);
            });
            markers.push(marker);
          }


          
 
  
  function myFunction() {
    location.reload();
}

