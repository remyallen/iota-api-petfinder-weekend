myApp.controller('FavController', ['$scope', '$http', function($scope, $http) {
    console.log('Fav Controller');
    $scope.message = "Hi, these are the favorites";
    $scope.favorites = {};


        $http.get('/data').then(function(response){
            var data = response.data;

            $scope.favoriteAnimals = data;

        });



    //$scope.dataFactory = DataFactory;
    //$scope.message = 'Addresses!';
    //$scope.people = [];
    //
    //if($scope.dataFactory.peopleData() === undefined) {
    //    // initial load
    //    $scope.dataFactory.retrieveData().then(function() {
    //        $scope.people = $scope.dataFactory.peopleData();
    //    });
    //} else {
    //    $scope.people = $scope.dataFactory.peopleData();
    //}

}]);