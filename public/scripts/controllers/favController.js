myApp.controller('FavController', ['$scope', 'DataFactory', function($scope, DataFactory) {
    console.log('Fav Controller');
    $scope.message = "Hi, these are the favorites";
    $scope.favorites = [];


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