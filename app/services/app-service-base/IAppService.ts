
/// <reference path="../../configs/_all.ts" />


module EPCISTests {

    export interface  IAppService {
        
        getById(id: number): any;
        listAll(): any;
        handlerResponded(response: any, params?: any): any;
    }
}