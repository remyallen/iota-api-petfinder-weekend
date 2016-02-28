myApp.controller('HomeController', ['$scope', '$http', function($scope, $http) {
    $scope.data = {};
    $scope.animal = {};
    //$scope.dataFactory = DataFactory;
    //$scope.animalForm = {};

    //if($scope.dataFactory.animalData() === undefined) {
    //   // initial load
    //    $scope.dataFactory.pushData().then(function() {
    //        $scope.people = $scope.dataFactory.animalData();
    //    });
    //} else {
    //    $scope.people = $scope.dataFactory.animalData();
    //}
    //
    //$scope.chooseAnimal = function() {
    //    $scope.dataFactory.addInfo($scope.animalForm);
    //    $scope.animalForm = '';
    //}

    $scope.chooseAnimal = function() {
        var selectedAnimal = $scope.animal;
        petFinder(selectedAnimal);
    };

    $scope.favorite = function() {
        var animal = $scope.animal;
        //console.log(animal);

        postFavorite(animal);

        function postFavorite(data) {
            $http.post('/data', data).then(function(response){
                console.log('posting');
            });
        };
    }

    function petFinder(data) {
        // API key
        var key = 'ca1607e0f626bb23c9566c746a9bfa27';

        var baseURL = 'http://api.petfinder.com/';
        var query = 'pet.getRandom';
        query += '?key=' + key;
        query += '&animal=' + data;
        query += '&output=basic';
        query += '&format=json';

        var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
        console.log(request);

        $http.jsonp(request).then(
            function(response) {
                $scope.animal = response.data.petfinder.pet;
                console.log($scope.animal);
            }
        );
    }
}]);