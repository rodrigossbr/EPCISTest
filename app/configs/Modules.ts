/// <reference path="_all.ts" />

module EPCISTests {
    'use strict';

    var modules = new Array<string>();
    modules.push('ngRoute');
    modules.push('ngAnimate');
    modules.push('ngMessages');
    modules.push('ngMaterial');
    modules.push('ngSanitize');
    modules.push('ui.tinymce');
    modules.push('toastr');
    modules.push('chart.js');

    angular.module(appConfig.appName, modules);
}