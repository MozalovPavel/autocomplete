var app = angular.module('AutocomleteAplication', [
    'ngRoute',
    'ngAnimate'
]);
app.config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        // routes
        $routeProvider
        .when("/", {
            templateUrl: "./views/main.html",
            controller: "MainController"
        })
        .otherwise({
            redirectTo: '/'
        });
    }
]);
app.constant('KeyCodes',
    {
        BACKSPACE : 8,
        TABKEY : 9,
        RETURNKEY : 13,
        ESCAPE : 27,
        SPACEBAR : 32,
        LEFTARROW : 37,
        UPARROW : 38,
        RIGHTARROW : 39,
        DOWNARROW : 40
    }
);
