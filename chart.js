define( [ "qlik", "./lib/lcjs.iife",],
 function (qlik) {
    'use strict';
   
    return {

        buildChart: async function ($element, layout, _self) {
            
            try {
                let lastrow = {
                    row: 0
                }
                let columns = layout.qHyperCube.qDimensionInfo.length + layout.qHyperCube.qMeasureInfo.length;

                // inital data 
                this.addData(_self, lastrow)
                // iteration to add more data
                await this.addMoreData(_self, lastrow, layout, columns);
                this.createChart($element, layout, _self);
            }
            catch (err) {
                console.info(err);
            }

        },

        addData: function (_self, lastrow) {
            _self.backendApi.eachDataRow(function (rownum, row) {
                lastrow.row = rownum;
            });

        },

        addMoreData: function(_self, lastrow, layout, colcount) {

            var _this = this;
            return new Promise(resolve => {


                // check amount of points was set
                if (_self.backendApi.getRowCount() > lastrow.row + 1 && lastrow.row <= layout.amount) {

                    var requestPage = [{
                        qTop: lastrow.row + 1,
                        qLeft: 0,
                        qWidth: colcount,
                        qHeight: Math.min(Math.floor(10000 / colcount), _self.backendApi.getRowCount() - lastrow.row)
                    }];
                    _self.backendApi.getData(requestPage).then(function (dataPages) {
                        _this.addData(_self, lastrow);
                        resolve(_this.addMoreData(_self, lastrow, layout, colcount));

                    });
                } else {
                    resolve();
                }
            });
        }, 

        createChart: function($element, layout, self){
            
                // Extract required parts from LightningChartJS.
                const {
                    lightningChart,
                    ColorHEX,
                    SolidFill,
                    SolidLine,
                    PointShape,
                    Themes,
                } = lcjs
    
                // Create a XY Chart.
                const chart = lightningChart().ChartXY({
                    container: 'lightningChart'
                })

                chart.setTitle(layout.chartTitle)
                    .setAnimationsEnabled(layout.animation)

                // Configure Y axis
                chart.getDefaultAxisY()
                    .setMouseInteractions(layout.yAnimation)
                    .setTitle(layout.yTitle)

                // Configure X axis
                chart.getDefaultAxisX()
                    .setMouseInteractions(layout.xAnimation)
                    .setTitle(layout.xTitle)

                let series 

                // Add selected series type 
                if(layout.chartType === 'LineSeries'){

                    series = chart.addLineSeries({
                        // dataPattern: {
                        //     pattern: 'ProgressiveX',
                        // }
                    })
                    .setStrokeStyle(new SolidLine({ 
                         fillStyle: new SolidFill({ color: ColorHEX(layout.color.color) }), 
                         thickness: layout.lineThickness 
                    }))

                } 
                else if (layout.chartType === 'PointLineSeries') {

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

                    series = chart.addPointSeries({
                         pointShape: PointShape.Triangle,
                         dataPattern: {
                            pattern: 'ProgressiveX',
                        }
                    })
                    .setPointSize(layout.PointSize )
                    .setPointFillStyle(new SolidFill({ color: ColorHEX(layout.pointColor.color) }));

                }

                self.backendApi.eachDataRow(function (rownum, row) {      
                    series.add({
                        x: row[0].qNum,
                        y: row[1].qNum,
                        
                    })
    
                });
        }
    }
 }
)

