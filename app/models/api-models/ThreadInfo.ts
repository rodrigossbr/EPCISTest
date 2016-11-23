

/// <reference path="../../configs/_all.ts" />
module EPCISTests {
    export class ThreadInfo {

        public name: string;
        public startDate: Date;
        public stopDate: Date;

        constructor() {
        }

        public get timeInSeconds(): number{
            return this.timeInMilliSeconds / 1000;
        }

        public get timeInMilliSeconds(): number{
            var stopDate = this.stopDate;
            if(!stopDate){
                stopDate = new Date();
            }

            return Math.abs(stopDate.getTime() - this.startDate.getTime());
        }
    }
}