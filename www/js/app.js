// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var cpstlApp = angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/test.html',
                controller: 'HomeController'
            })
            .state('search', {
                url: '/searchloc',
                templateUrl: 'templates/search.html',
                controller: 'SearchController'
            })
            .state('current', {
                url: '/searchcur',
                templateUrl: 'templates/curlocation.html',
                controller: 'CurrentLocationController'
            })
            .state('products', {
                url: '/products',
                templateUrl: 'templates/productlist.html',
                params: {
                           stationid: null
                         },
                controller: 'ProductListController'
            });
        $urlRouterProvider.otherwise('/home');
    });