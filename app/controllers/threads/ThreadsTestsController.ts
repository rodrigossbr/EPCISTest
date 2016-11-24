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
        public optionToRender: any;
        public mostrarLabels: boolean;
        public startData: Date;
        public stopData: Date;

        constructor($location: ILocationService, threadsService: ThreadsService, $rootScope: IRootScope) {
            this.$location = $location;
            this.threadsService = threadsService;
            this.$rootScope = $rootScope;
            this.threadsQtd = 1;
            this.isRun = false;
            this.requestType = "get";
            this.contentType = "application/xml";
            this.chartData = new ChartData();
            this.mostrarLabels = false;
            this.urlEpcis = "http://192.168.0.102:8080/epcis-webadapter-0.1.0/rest/1/eventquery/result?epc=urn:epc:id:sgtin:*";
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
            this.startData = new Date();
            for(var i = 0; i < this.threadsQtd; i++){
                this.executeService(this.urlEpcis);
            }
        }

        public aplicarOpcoes(){
            this.mostrarLabels = !this.mostrarLabels;
            this.optionToRender ={
                showAllTooltips: this.mostrarLabels
            }
        }

        public executeService(url: string): void{
            var tInfo = new ThreadInfo();
            tInfo.startDate = new Date();

            this.threadsService.executeService(url, this.requestType)
                .then((data) => {
                    tInfo.stopDate = new Date();
                    this.stopData = new Date();
                    this.chartData.addThreadInfo(tInfo);
                })
                .catch((response) => {
                    tInfo.stopDate = new Date();
                    this.stopData = new Date();
                    this.chartData.addThreadInfo(tInfo);
                });
        }

        public getStartTime(): string{
            if(this.startData){
                return this.startData.getHours() +":"+ this.startData.getMinutes() +":"+this.startData.getSeconds()+":"+this.startData.getMilliseconds();
            }
            return "";
        }

        public getStopTime(): string{
            if(this.stopData){
                return this.stopData.getHours() +":"+ this.stopData.getMinutes() +":"+this.stopData.getSeconds()+":"+this.stopData.getMilliseconds();
            }
            return "";
        }

    }

    angular.module(appConfig.appName).controller('ThreadsTestsController', ThreadsTestsController);
}