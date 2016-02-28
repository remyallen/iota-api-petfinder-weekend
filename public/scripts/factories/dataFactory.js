myApp.factory('DataFactory', ['$http', function($http) {
    // PRIVATE
    var animals = undefined;

    var postData = function() {
        console.log('posting data to database');
        var promise = $http.post('/data').then(function(response) {
            animals = response.data;
            console.log('Async data response:', animals);
        });

        return promise;
    };

    var chooseAnimal = function(selectedAnimal) {
        animals.push(selectedAnimal);
    };


    //PUBLIC
    var publicApi = {
        animalData: function() {
            return animals;
        },
        pushData: function() {
            return postData();
        },
        addInfo: function(selectedAnimal) {
            chooseAnimal(selectedAnimal);
        }
    };

    return publicApi;

}]);