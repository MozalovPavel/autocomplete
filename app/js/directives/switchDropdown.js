app.directive('switchDropdown', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            // var  = element.css('top');
            var startY = element.position().top;
            var isBottomLocation = true;
            var bottomLocation;
            var topLocation;
            var parent = element.parent();
            var parentHeight = $(parent).height();
            var parentBorderWidth = parseInt($(parent).css('borderWidth')) * 2;
            var elemBorderWidth = parseInt(element.css('borderWidth')) * 2;
            var timer = setInterval(function () {
                var elemHeight = element.height();
                var elemPositionTop = element.position().top;
                var windowHeight = $(window).height();
                var elementOffsetTop = element.prop('offsetTop');

                bottomLocation = parentHeight + $(parent).offset().top + parentBorderWidth;
                topLocation = $(parent).offset().top - parentBorderWidth - elemHeight - elemBorderWidth;

                if (windowHeight < elemHeight + bottomLocation + elemBorderWidth) {
                    element.css('top', topLocation + 'px');
                } else {
                    element.css('top', bottomLocation + 'px');
                }
                if (elemHeight <= 0) {
                    clearInterval(timer);
                }
            }, 10);
        }
    };
});
