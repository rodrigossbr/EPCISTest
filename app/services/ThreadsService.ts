
/// <reference path="../configs/_all.ts" />


module EPCISTests {

    export class ThreadsService extends AppServiceBase{
    
        public setThreads(numThreads: number): any {
            return super.getFromUrl(appConfig.serviceUrls().threadTests.setThreads, numThreads);
        }

        public getThreadsStatus(): any {
            return super.getFromUrl(appConfig.serviceUrls().threadTests.getThreadsStatus);
        }

        public executeService(url: string, requestType: string, params?: any): any {

            switch (requestType){
                case "get":
                    return super.getFromUrl(url);
                case "post":
                    return super.postFromUrl(url, params);
                case "put":
                    return super.putFromUrl(url, params);
                case "delete":
                    return super.deleteFromUrl(url, params);
            }

            return super.getFromUrl(url);
        }
    }

    angular.module(appConfig.appName).service("ThreadsService", ThreadsService);
}