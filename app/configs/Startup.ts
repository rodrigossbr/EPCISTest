/// <reference path="_all.ts" />

module EPCISTests {
    'use strict';

    function config($mdThemingProvider, ChartJsProvider) {
        $mdThemingProvider.theme('default')
            .dark()
            .primaryPalette('blue-grey')
            .accentPalette('blue')

        ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
    }
    config.$inject = ['$mdThemingProvider', 'ChartJsProvider'];
    angular.module(appConfig.appName).config(config);
    
    function start($rootScope: IRootScope) {

        $rootScope.header = {
            headers: {
                "Content-Type": "application/xml",
                "Access-Control-Allow-Origin": "*"
            }
        };

    }

	start.$inject = ['$rootScope'];
	angular.module(appConfig.appName).run(start);
}