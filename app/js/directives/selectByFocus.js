app.directive('selectByFocus', function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            element.on("focus", function () {
                scope.$apply(function() {
                    element.select();
                });
            });
        }
    };
});
