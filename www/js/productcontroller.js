

cpstlApp.controller("ProductListController", function($scope, $state) {
    //alert($state.params.stationid);
    var id = $state.params.stationid;
    $scope.productList = [];
    var url = "http://localhost/group2/distance-route-cpstl/responsive/handlers/databasehandler.php";
    //var url = "http://cpstl.azurewebsites.net/handlers/databasehandler.php";
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

    });
});

