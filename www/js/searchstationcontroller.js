cpstlApp.controller("SearchController", function($scope, $state) {

 
});

//GOOGLE MAP CONTROLLER FOR SEARCH Station
cpstlApp.controller("MapSearchController", function($scope, $state,$compile) {
    
    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(6.929476, 79.887082);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            /*
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });*/
        });
        

        var geocoder = new google.maps.Geocoder();

        $scope.map = map;
        $scope.geocoder = geocoder;
 
    });
    $scope.geocodeAddress = function(){
       
        var address = document.getElementById('address').value;
         $scope.geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            $scope.map.setCenter(results[0].geometry.location);
            console.log(results);
            $scope.markers = [];
            $scope.callAjaxRequest($scope.map,results[0].geometry.location.lat(),results[0].geometry.location.lng(),7);

             

          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
        
    };
    $scope.myGoBack = function() {
        $state.go("home");
    };

    $scope.callAjaxRequest = function(map,lat,lng,dist){
        // var url ="http://cpstl.azurewebsites.net/handlers/databasehandler.php";
        var url = "http://localhost/group2/distance-route-cpstl/responsive/handlers/databasehandler.php";
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
                        $scope.createMarker(map,location, station.name, station.address,station.contact,station.type,station.id);
                    }
                }catch (err){
                    stations = null;
                }

        });
    };

    $scope.createMarker = function(map,latlng, name, address,contact,type,id) {
        var button_cl = '<button ng-click="productview(\''+id+'\')">Products</button>';
        var station_details = "<div><b>" + name + "</b> <br/>" + address + "</b> <br/>" + contact + "</b> <br/>" + type + "</b> <br/>"+button_cl+"</div>";
        var compiled = $compile(station_details)($scope);
            var marker = new google.maps.Marker({
                map: map,
                position: latlng
              });

              var infoWindow = new google.maps.InfoWindow({
            content: compiled[0]
          });

            google.maps.event.addListener(marker, 'click', function() {
              infoWindow.setContent(compiled[0]);
              infoWindow.open(map, marker);
            });
            $scope.markers.push(marker);
    };
    $scope.productview = function(id) {
        //alert(id);
        $state.go("products",{stationid: id});
    };

});
