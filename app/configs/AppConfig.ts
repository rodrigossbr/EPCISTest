

var appConfig = {
    appName: "EPCISTests",
    version: "0.0.1",
    defaultRoute: "/",
    rootServiceRoute: "http://localhost:41000/",
    serviceUrls: ()=> {
        return {
            threadTests: {
                setThreads: appConfig.rootServiceRoute + "api/threads/setThreads",
                getThreadsStatus: appConfig.rootServiceRoute + "api/threads/getThreadsStatus"
            }
        };
    }
};