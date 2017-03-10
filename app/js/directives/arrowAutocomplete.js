app.directive('arrowAutocomplete', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../../views/directives/arrowAutocomplete.html',
        scope: {
            dataList: '=list'
        },
        controller: 'ArrowAutocompleteCtrl'
    };
});
