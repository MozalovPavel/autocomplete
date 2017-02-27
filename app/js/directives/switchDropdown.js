app.directive('switchDropdown', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var timer = setInterval(function () {
                var parent = element.parent()[0];
                var parentHeight = $(parent).height();
                var parentBorderWidth = parseInt($(parent).css('borderWidth'));
                var elemBorderWidth = parseInt(element.css('borderWidth'));
                var elemHeight = element.height();
                var windowHeight = $(window).height();

                if (parent) {
                    var bottomLocation = $(parent).offset().top + parentHeight;
                    var topLocation = $(parent).offset().top - parentBorderWidth * 2 - elemHeight - elemBorderWidth * 3;

                    if (windowHeight < elemHeight + bottomLocation + elemBorderWidth) {
                        element.css('top', topLocation + 'px');
                    } else {
                        element.css('top', bottomLocation + 'px');
                    }
                }
                if (elemHeight <= 0) {
                    clearInterval(timer);
                }
            }, 10);
        }
    };
});
