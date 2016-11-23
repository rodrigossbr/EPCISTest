/// <reference path="_all.ts" />

module EPCISTests {
    'use strict';

    function config($routeProvider: ng.route.IRouteProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "app/views/thread-tests/thread-tests.html",
                controller: "ThreadsTestsController",
                controllerAs: "vm"
            })
            .otherwise({
                templateUrl: "app/views/shared/404.html",
                controller: "SharedController",
                controllerAs: "vm"
            });;
    }

    config.$inject = ['$routeProvider'];

    angular.module(appConfig.appName).config(config);
}