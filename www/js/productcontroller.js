

cpstlApp.controller("ProductListController", function($scope, $state, $http) {
    //alert($state.params.stationid);
    var id = $state.params.stationid;
    $scope.productList = [];
    //var url = "http://localhost/group2/distance-route-cpstl/responsive/handlers/databasehandler.php";
    var url = "http://cpstl.azurewebsites.net/handlers/databasehandler.php";
    /*var prms = {task:"getstationinfo",
            stationID:id};
            
    $http.get(url,prms).success(function(data) {
        try{
                //{"name":"New Bustand","type":"LIOC Dealer","area":"Anuradhapura","district":"Anuradhapura","contact":"0719990542","products"😞"Petrol"]}
                var station = JSON.parse(data);//[routeid,infojson,distance]
                console.log(station);
                //alert(data);
                var i;
                //alert(station.products);
                for(i=0;i<station.products.length;i++){
                    var product = station.products[i];
                    //alert(product);
                    $scope.productList.push(product);
                    //$('#product').append($('<li>').text(product));

                }
            }catch (err){
                station = null;
            }
    });*/
    
    $.get(
        url,
        {
            task:"getstationinfo",
            stationID:id
        },
        function(data){
            try{
                //{"name":"New Bustand","type":"LIOC Dealer","area":"Anuradhapura","district":"Anuradhapura","contact":"0719990542","products"😞"Petrol"]}
                var station = JSON.parse(data);//[routeid,infojson,distance]
                console.log(station);
                //alert(data);
                var i;
                var htmlstring = '';
                //alert(station.products);
                for(i=0;i<station.products.length;i++){
                    var product = station.products[i];
                    //alert(product);
                    htmlstring += '<div class="item proditem"><i class="icon ion-ios-pint"></i>';
                    htmlstring += product;
                    htmlstring += '</div>';
            
                    $scope.productList.push(product);
                    //$('#product').append($('<li>').text(product));

                }
                document.getElementById('product').innerHTML = htmlstring;
            }catch (err){
                station = null;
            }

    });
    
});

