define( [ "qlik", "./definition", './chart' ,"./lib/lcjs.iife",],

function ( qlik, definition, chart) {

	let height = (el)=> el.clientHeight
	return {
		// initial Properties
		initialProperties: {
			refLineList: [],
			shapes: [],
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qTop: 4,
          qLeft: 0,
					qWidth: 20,
					qHeight: 0
				}]
			},
			selectionMode: "CONFIRM"
		},
		definition : definition,
		support : {
			snapshot: true,
			export: true,
			exportData : false
		},
		controller: ['$scope', function ($scope) {
			console.log($scope, 'LCJS');
			$scope.selectedElements = new Map();

		}],

		// paint funcition that redner Qlik page
		paint: function ($element, layout) {

			// add HTML container for LCJS
			$element.html(`<div id="lightningChart" style="height:${height($element[0])}px"></div>`)
		
			console.time("chart.buildCharLCJJS");
			// call buildChart fucntion to build the Chart 
			chart.buildChart($element, layout, this).then(function() {
				return qlik.Promise.resolve();
			});
			console.timeEn("chart.buildCharLCJJS");
		},
	};

} );