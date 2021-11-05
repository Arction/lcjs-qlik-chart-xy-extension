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
							label:"Color",
							component: "color-picker",
							ref: "color",
							type: "object",
							defaultValue: {
							  color: "#fecc00",
							  index: "-1"
							}
						},
						amount: {
							type: "integer",
							label: "Amount of Points",
							ref: "amount",
							defaultValue: 500,
							expression: "always"
	
						},
						animation: {
							type: "boolean",
							component: "switch",
							label: "Enable Animation",
							ref: "animation",
							options: [{
								value: true,
								label: "On"
							}, {
								value: false,
								label: "Off"
							}],
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
									options: [{
										value: true,
										label: "On"
									}, {
										value: false,
										label: "Off"
									}],
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
									options: [{
										value: true,
										label: "On"
									}, {
										value: false,
										label: "Off"
									}],
									defaultValue: true
								}
							}
						}
					}
				}
			}

        }
    }
)