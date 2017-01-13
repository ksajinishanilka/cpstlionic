

cpstlApp.controller("CurrentLocationController", function($scope, $state) {

 
});

//GOOGLE MAP CONTROLLER FOR SEARCH Station
cpstlApp.controller("MapCurrentController", function($scope, $state,$compile) {
    
    google.maps.event.addDomListener(window, 'load', function() {
       /* var directionsDisplay;//
        var directionsService = new google.maps.DirectionsService();///*/
        var myLatlng = new google.maps.LatLng(6.929476, 79.887082);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var geocoder = new google.maps.Geocoder();

        $scope.map = map;
        $scope.geocoder = geocoder;

        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            /*
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });*/
            $scope.callAjaxRequest($scope.map,pos.coords.latitude,pos.coords.longitude,1);
        });
        

        
        
    });

   /*$scope.calcRoute = function(){
    var start = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    var end = new google.maps.LatLng(37.441883, -122.143019);
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(map);
      } else {
        alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
      }
    });*/
    $scope.geocodeAddress = function(){
        location.reload();
    };

    $scope.myGoBack = function() {
        $state.go("home");
    };

    $scope.callAjaxRequest = function(map,lat,lng,dist){
         //var url ="http://cpstl.azurewebsites.net/handlers/databasehandler.php";
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
         //var button_rt = '<button ng-click="productview(\''+id+'\')">Products</button>';
        var station_details = "<div><b>" + name + "</b> <br/>" + address + "</b> <br/>" + contact + "</b> <br/>" + type + "</b> <br/>"+button_cl+/*button_rt*/ "</div>";
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
