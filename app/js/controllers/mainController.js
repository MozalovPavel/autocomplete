angular.module('AutocomleteAplication')
.controller('MainController', ['$scope', 'dataFactory', function($scope, dataFactory) {
    $scope.cityList = [];
    dataFactory.getList().then(
        function (response) {
            $scope.cityList = response.data.map(function (item) {
                return item.City;
            }).sort();
        }
    );
}]);
