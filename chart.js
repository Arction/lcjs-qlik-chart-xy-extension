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
                    PointShape,
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

                let series 

                if(layout.chartType === 'LineSeries'){

                    layout.showLineStyle = true
                    layout.showPointSize = false
                    
                    series = chart.addLineSeries({
                        dataPattern: {
                            pattern: 'ProgressiveX',
                        }
                    })
                    .setStrokeStyle(new SolidLine({ 
                         fillStyle: new SolidFill({ color: ColorHEX(layout.color.color) }), 
                         thickness: layout.lineThickness 
                    }))

                } else if (layout.chartType === 'PointLineSeries') {

                    layout.showPoints = true
                    layout.showLineSeries = true

                    series = chart.addPointLineSeries({
                        pointShape: PointShape.Circle,
                        dataPattern: {
                            pattern: 'ProgressiveX',
                        }
                    })
                    .setStrokeStyle(new SolidLine({ 
                        fillStyle: new SolidFill({ color: ColorHEX(layout.color.color) }), 
                        thickness: layout.lineThickness 
                    }))
                    .setPointSize(layout.PointSize )
                    .setPointFillStyle(new SolidFill({ color: ColorHEX(layout.pointColor.color)}));


                } else {

                    layout.showPoints = true
                    layout.showLineSeries = false

                    series = chart.addPointSeries({
                         pointShape: PointShape.Triangle,
                         dataPattern: {
                            pattern: 'ProgressiveX',
                        }
                    })
                    .setPointSize(layout.PointSize )
                    .setPointFillStyle(new SolidFill({ color: ColorHEX(layout.pointColor.color) }));

                }


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