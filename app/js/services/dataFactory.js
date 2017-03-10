app.service('dataFactory', ['$http', function ($http) {
    this.getList = function () {
        return $http.get('kladr.json');
    };
}]);
