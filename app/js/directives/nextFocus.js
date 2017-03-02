app.directive('nextFocus', [ 'KeyCodes', function(KeyCodes) {
    return {
        restrict: 'A',
        scope: {
            isNextFocus: '=nextFocus'
        },
        link: function(scope, element, attrs) {
            scope.$watch('isNextFocus', function (value) {
                if (value) {
                    // jQuery.tabNext();
                    jQuery.tabNext();
                    scope.isNextFocus = false;
                }
            });
        }
    };
}]);
