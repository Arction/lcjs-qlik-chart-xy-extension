define( [ "qlik", "./lib/lcjs.iife",],
 function (qlik) {
    'use strict';
   
    return {


        buildChart: async function ($element, layout, _self) {
            
            try {
            let lastrow = {}
            lastrow.row = 0
            let columns = layout.qHyperCube.qDimensionInfo.length + layout.qHyperCube.qMeasureInfo.length;
            this.addMoreData(_self, lastrow)
            await this.getData(_self, lastrow, layout, columns);
            this.createChart($element, layout, _self);
        }
        catch (err) {
            console.info(err);
        }

        },

        //loop through the rows we have and render
        addMoreData: function (_self, lastrow) {
            _self.backendApi.eachDataRow(function (rownum, row) {
                lastrow.row = rownum;
            });

        },

        
        getData: function(_self, lastrow, layout, colcount) {

            var _this = this;
            return new Promise(resolve => {


                if (_self.backendApi.getRowCount() > lastrow.row + 1 && lastrow.row <= layout.amount) {

                    //we havent got all the rows yet, so get some more, 1000 rows
                    var requestPage = [{
                        qTop: lastrow.row + 1,
                        qLeft: 0,
                        qWidth: colcount, //should be # of columns
                        qHeight: Math.min(Math.floor(10000 / colcount), _self.backendApi.getRowCount() - lastrow.row)
                    }];
                    _self.backendApi.getData(requestPage).then(function (dataPages) {

                        //console.log(" Page  lastrow.row ........... "  + lastrow);
                        //when we get the result trigger paint again
                        _this.addMoreData(_self, lastrow);
                        resolve(_this.getData(_self, lastrow, layout, colcount));

                    });
                } else {
                    console.log( resolve(), 'resolve()');
                    resolve();
                }
            });
        }, 

        createChart: function($element, layout, _self){
            
                const {
                    lightningChart,
                    ColorHEX,
                    SolidFill,
                    SolidLine,
                    AutoCursorModes,
                    AxisTickStrategies,
                    translatePoint,
                    UILayoutBuilders,
                    UIElementBuilders,
                    UIOrigins,
                    Themes,
                } = lcjs
    
                const chart = lightningChart().ChartXY({
                    container: 'lightningChart'
                })
                    .setTitle(layout.chartTitle)
                    .setAnimationsEnabled(layout.animation)

                chart.getDefaultAxisY()
                    .setMouseInteractions(layout.yAnimation)
                    .setTitle(layout.yTitle)
                chart.getDefaultAxisX()
                    .setMouseInteractions(layout.XAnimation)
                    .setTitle(layout.xTitle)

                const series = chart.addLineSeries({
                    dataPattern: {
                        // pattern: 'ProgressiveX' => Each consecutive data point has increased X coordinate.
                        pattern: 'ProgressiveX',
                    }
                 })
                series.setStrokeStyle(new SolidLine({ fillStyle: new SolidFill({ color: ColorHEX(layout.color.color) }), thickness: 2 }))
                _self.backendApi.eachDataRow(function (rownum, row) {      
                    series.add({
                        x: row[0].qNum,
                        y: row[1].qNum,
                        
                    })
    
                });

        }
    }
 }
)