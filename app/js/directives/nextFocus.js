app.directive('nextFocus', [ 'KeyCodes', function(KeyCodes) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('keydown', function(e) {
                var code = e.keyCode || e.which;
                if (code === KeyCodes.RETURNKEY) {
                    e.preventDefault();
                    element.next().focus();
                }
            });
        }
    };
}]);
