app.directive('customScroll', [function() {
    return {
        restrict: 'A',
        // replace: true,
        scope: {
            loadMore: '=csLoadMore',
            scrollToElemIdx: '=csScrollToElemIdx',
            searchText: '=csSearchText',
            listLength: '=csListLength'
        },
        link: function(scope, element, attrs) {
            scope.$watchGroup(['listLength', 'searchText'], function () {
                var api = element.data('jsp');
                if (api) {
                    setTimeout(function () {
                        var jspPane = element.find('.jspPane');
                        element.css('height', jspPane.height() + 2);
                        api.reinitialise();
                    }, 0);
                } else {
                    setTimeout(function() {
                        element.jScrollPane();
                        scrollToElement();
                        element.bind('jsp-scroll-y', function (event, scrollPositionY, isAtTop, isAtBottom) {
                            if (isAtBottom) {
                                setTimeout(function () {
                                    scope.$apply(scope.loadMore);
                                }, 10);
                            }
                        });
                        element.bind('focus', function () {
                            jQuery.tabNext();
                        });
                    }, 0);
                }
            });
            function scrollToElement() {
                var api = element.data('jsp');
                if (api && scope.scrollToElemIdx >= 0) {
                    var scrollToElem = element.find('li')[scope.scrollToElemIdx];
                    api.scrollToElement(scrollToElem, true);
                    api.reinitialise();
                }
            }
            // scope.api = element.data('jsp');

            // scope.$watch('api', function (v) {
            //     console.log(v);
            //     scrollToElement();
            // });

            // setTimeout(function () {
            //     var api = element.data('jsp');
            //     if (api && scope.scrollToElemIdx >= 0) {
            //         var scrollToElem = element.find('li')[scope.scrollToElemIdx];
            //         api.scrollToElement(scrollToElem, true);
            //         api.reinitialise();
            //     }
            // }, 1000);
            scope.$watch('scrollToElemIdx', scrollToElement);
        }
    };
}]);
