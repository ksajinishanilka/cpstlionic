
      var markers = [];
      function initMap() {
        var cpstl = {lat: 6.929476, lng: 79.887082};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: cpstl


        });
        MAPG = map;
         var infowindow = new google.maps.InfoWindow({
          content: "CPSTL"
        });

        var marker = new google.maps.Marker({
          position: cpstl,
          map: map,
          title: 'CPSTL'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });




        var geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
      }

      function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            console.log(results);
            /*
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });*/
            markers = [];
             callAjaxRequest(resultsMap,results[0].geometry.location.lat(),results[0].geometry.location.lng(),50);

             

          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
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

    google.maps.event.addDomListener(window,'load',initialize);


