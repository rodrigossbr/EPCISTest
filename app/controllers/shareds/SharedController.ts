

/// <reference path="../../configs/_all.ts" />

module EPCISTests {
    export class SharedController {

        static $inject = ['$location'];

        private $location: ILocationService;
        
        constructor($location: ILocationService) {
            this.$location = $location;
        }
        
    }
    
    angular.module(appConfig.appName).controller('SharedController', SharedController);
}