app.directive('nextFocus', [ 'KeyCodes', function(KeyCodes) {
    return {
        restrict: 'A',
        scope: {
            isNextFocus: '=nextFocus'
        },
        link: function(scope, element, attrs) {
            scope.$watch('isNextFocus', function (value) {
                if (value) {
                    var nextElement = element.parent().next()[0];
                    nextElement.focus();
                    scope.isNextFocus = false;
                }
            });
        }
    };
}]);
