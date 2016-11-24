

/// <reference path="../../configs/_all.ts" />
module EPCISTests {
    export class ChartData {

        public threads: Array<ThreadInfo>;
        public labels: Array<string>;
        public data: Array<number>;
        public dataSetOverrride: any;

        constructor() {
            this.threads = new Array<ThreadInfo>();
            this.labels = new Array<string>();
            this.data = new Array<number>();

            this.dataSetOverrride = [
                {
                    label: "Start",
                    borderWidth: 1,
                    type: 'line'
                },
                {
                    label: "Stop",
                    borderWidth: 1,
                    type: 'line'
                }
            ];

            this.refresh();
        }

        public reset(): void{
            this.threads = new Array<ThreadInfo>();
            this.labels = new Array<string>();
            this.data = new Array<number>();
        }

        private refresh(): void{
            this.threads.forEach((t) => {
                var lbl = this.labels.filter((l) => { return l == t.name; });
                if(lbl.length == 0){
                    this.labels.push(t.name);
                    this.data.push(t.timeInMilliSeconds);

                    console.log("-------------")
                    console.log(t.startDate.getHours() +":"+ t.startDate.getMinutes() +":"+t.startDate.getSeconds()+":"+t.startDate.getMilliseconds());
                    console.log(t.stopDate.getHours() +":"+ t.stopDate.getMinutes() +":"+t.stopDate.getSeconds()+":"+t.stopDate.getMilliseconds());

                }
            });
        }

        public addThreadInfo(threadInfo: ThreadInfo): void{
            threadInfo.name = "T" + this.threads.length;
            this.threads.push(threadInfo);
            this.refresh();
        }
    }
}