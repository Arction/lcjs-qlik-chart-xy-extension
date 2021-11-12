define([], function () {
    'use strict';
    return {
			type: "items",
			component: "accordion",
			items: {
        dimensions: {
					uses: "dimensions",
					min: 1,
					max: 2
        },
				measures: {
					uses: "measures",
					min: 1,
					max: 20
				},
				settings: {
					uses: "settings",
					items: {

						color: {
							label:"Series Color",
							component: "color-picker",
							ref: "color",
							type: "object",
							defaultValue: {
							  color: "#fecc00",
							  index: "-1"
							}
						},
						
						pointColor: {
							label:"Point Color",
							component: "color-picker",
							ref: "pointColor",
							type: "object",
							defaultValue: {
							  color: "#fecc00",
							  index: "-1"
							},
							// show: (layout) => (layout.showPoints)
						},

						amount: {
							type: "integer",
							label: "Amount of Points",
							ref: "amount",
							defaultValue: 500,
							expression: "always"
						},

						chartSettings: {
							type: "items",
							label: "Chart Settings",
							ref: "ChartSettings",
							items: {
								chartType: {
										type: "string",
										component: "dropdown",
										label: "Chart Type",
										ref: "chartType",
										options: [
												{
														value: "LineSeries",
														label: "LineSeries"
												}, 
												{
														value: "PointLineSeries",
														label: "Point Line Series"
												},
												{
														value: "Point Series",
														label: "PointSeries"
												}
											],						
										defaultValue: "LineSeries",
								},
								lineStyle: {
									type: "number",
									component: "slider",
									label: "line thickness",
									ref: "lineThickness",
									min: 1,
									max: 10,
									step: 1,
									defaultValue: 2,
									// show: (layout) => (layout.showLineSeries)
								},
								pointStyle: {
									type: "number",
									component: "slider",
									label: "Point size",
									ref: "PointSize",
									min: 1,
									max: 10,
									step: 1,
									defaultValue: 2,
									// show: (layout) => (layout.showPoints)
								},

								showLineSeries : {
									type: "boolean",
									ref: "showLineSeries",
									defaultValue: true,
									show: false
								},
								showPoints : {
									type: "boolean",
									ref: "showPoints",
									defaultValue: true,
									show: false
								}
							},
						},

						animation: {
							type: "boolean",
							component: "switch",
							label: "Enable Animation",
							ref: "animation",
							options: [
								{
									value: true,
									label: "On"
								}, 
								{
									value: false,
									label: "Off"
								}
							],
							defaultValue: true
						},

						chartTitle: {
							type: "string",
							label: "Chart Title",
							ref: "chartTitle",
							defaultValue: "",
							expression: "always"
						},

						yAxisSettings: {
							type: "items",
							ref: "yAxisSettings",
							label: "Y Axis",
							items: {
								yTitle: {
									type: "string",
									label: "Title",
									ref: "yTitle",
									defaultValue: "",
									expression: "always"
								},
								yAnimation: {
									type: "boolean",
									component: "switch",
									label: "Enable Animation",
									ref: "yAnimation",
									options: [
										{
											value: true,
											label: "On"
										}, 
										{
											value: false,
											label: "Off"
										}
									],
									defaultValue: true
								}
							}
						},

						xAxisSettings: {
							type: "items",
							ref: "xAxisSettings",
							label: "X Axis",
							items: {
								xTitle: {
									type: "string",
									label: "Title",
									ref: "xTitle",
									defaultValue: "",
									expression: "always"
	
								},
								xAnimation: {
									type: "boolean",
									component: "switch",
									label: "Enable Animation",
									ref: "xAnimation",
									options: [
										{
											value: true,
											label: "On"
										}, {
											value: false,
											label: "Off"
										}
									],
									defaultValue: true
								}
							}
						}
					}
				}
    	}
 	 }
})