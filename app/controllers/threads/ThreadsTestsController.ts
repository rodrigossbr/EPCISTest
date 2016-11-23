/// <reference path="../../configs/_all.ts" />

module EPCISTests {
    export class ThreadsTestsController {

        static $inject = ['$location', 'ThreadsService', '$rootScope'];

        private $rootScope: IRootScope;
        private $location: ILocationService;
        private threadsService: ThreadsService;
        public threadsQtd: number;
        public chartData: ChartData;
        public isRun: boolean;
        public urlEpcis: string;
        public contentType: string;
        public requestType: string;

        constructor($location: ILocationService, threadsService: ThreadsService, $rootScope: IRootScope) {
            this.$location = $location;
            this.threadsService = threadsService;
            this.$rootScope = $rootScope;
            this.threadsQtd = 1;
            this.isRun = false;
            this.requestType = "get";
            this.contentType = "application/xml";
            this.chartData = new ChartData();
        }

        public play(): void{
            this.isRun = true;

            this.$rootScope.header.headers = {
                                            "Content-Type": this.contentType + "; charset=UTF-8",
                                            "Access-Control-Allow-Origin": "*",
                                            "Access-Control-Allow-Headers": "*"
                                        }

            this.refreshThreads();
        }

        public stop(): void{
            this.isRun = false;
            this.chartData.reset();
        }

        public refreshThreads(): void{

            if(!this.isRun)
                return;

            this.chartData.reset();
            for(var i = 0; i < this.threadsQtd; i++){
                this.executeService(this.urlEpcis);
            }
        }

        public executeService(url: string): void{
            var tInfo = new ThreadInfo();
            tInfo.startDate = new Date();
            this.chartData.addThreadInfo(tInfo);
            this.threadsService.executeService(url, this.requestType)
                .then((data) => {
                    tInfo.stopDate = new Date();
                    console.log(data);
                })
                .catch((response) => {
                    console.log(response);
                });
        }
    }

    angular.module(appConfig.appName).controller('ThreadsTestsController', ThreadsTestsController);
}