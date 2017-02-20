app.directive('focusOn', ['$timeout', function($timeout) {
   return {
       scope: { trigger: '=focusOn' },
       link: function(scope, element) {
           scope.$watch('trigger', function(value) {
               if (value) {
                   $timeout(function() {
                       element.focus();
                       scope.trigger = false;
                   });
               }
           });
       }
   };
}]);
