app.directive('autocomplete', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../../views/directives/autocomplete.html',
        scope: {
            dataList: '=list'
        },
        controller: 'AutocompleteCtrl'
    };
});
