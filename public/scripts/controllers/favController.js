myApp.controller('FavController', ['$scope', '$http', function($scope, $http) {
    console.log('Fav Controller');
    $scope.message = "Hi, these are the favorites";
    //$scope.favorites = {};


        $http.get('/data').then(function(response){
            var data = response.data;

            $scope.favoriteAnimals = data;

        });

}]);