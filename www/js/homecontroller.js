
cpstlApp.controller("HomeController", function($scope, $state) {
 
    //alert('Hi');
    $scope.searchview = function(){
      $state.go("search");
    };
 	$scope.currentview = function(){
      $state.go("current");
    };
});



