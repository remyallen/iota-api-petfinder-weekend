var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'HomeController'
        })
        .when('/favorite', {
            templateUrl: '/views/templates/favorite.html',
            controller: 'FavController'
        })
        .otherwise({
            redirectTo: 'home'
        });
}]);



