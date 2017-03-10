app.config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
        // routes
        $routeProvider
        .when("/", {
            templateUrl: "./views/mainPage.html",
            controller: "MainController"
        })
        .otherwise({
            redirectTo: '/'
        });
    }
]);
