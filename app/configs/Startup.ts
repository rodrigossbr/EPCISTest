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

        // Aplica tootips sempre visiveis nos graficos
        (<any>Chart).pluginService.register({
            beforeRender: function (chart) {
                if (chart.config.options.showAllTooltips) {
                    chart.pluginTooltips = [];
                    chart.config.data.datasets.forEach(function (dataset, i) {
                        chart.getDatasetMeta(i).data.forEach(function (sector, j) {
                            chart.pluginTooltips.push(new (<any>Chart).Tooltip({
                                _chart: chart.chart,
                                _chartInstance: chart,
                                _data: chart.data,
                                _options: chart.options.tooltips,
                                _active: [sector]
                            }, chart));
                        });
                    });
                    chart.options.tooltips.enabled = false;
                }
            },
            afterDraw: function (chart, easing) {
                if (chart.config.options.showAllTooltips) {
                    if (!chart.allTooltipsOnce) {
                        if (easing !== 1)
                            return;
                        chart.allTooltipsOnce = true;
                    }
                    chart.options.tooltips.enabled = true;
                    (<any>Chart).helpers.each(chart.pluginTooltips, function (tooltip) {
                        tooltip.initialize();
                        tooltip.update();
                        tooltip.pivot();
                        tooltip.transition(easing).draw();
                    });
                    chart.options.tooltips.enabled = false;
                }
            }
        })

    }

	start.$inject = ['$rootScope'];
	angular.module(appConfig.appName).run(start);
}