sap.ui.define([
  "sap/ui/core/Control",
	"MyUI5WebApp/model/formatter"

], function (Control, formatter) {
	"use strict";
	return Control.extend("MyUI5WebApp.controls.invCharts.MultiLineChart", {
		metadata : {
            properties : {
                title: {type : "string", defaultValue: ""},
                values: {type : "array", defaultValue:[]},
                labels: {type : "array", defaultValue:[]},
                labelY: {type : "string", defaultValue: "Valores"},
                labelX: {type : "string", defaultValue: "Meses"},
                displayTitle: {type : "boolean", defaultValue:true},
                tooltipMode: {type : "string", defaultValue: "index"},
                tooltipIntersect: {type : "boolean", defaultValue: false},
                hoverIntersect: {type : "boolean", defaultValue: true},
                hoverMode: {type : "string", defaultValue: "nearest"},
                displayLabelX: {type : "boolean", defaultValue: false},
                displayLabelY: {type : "boolean", defaultValue: false},
                chartType: {type: "string", defaultValue:"line"},
                width: {type: "sap.ui.core.CSSSize",defaultValue: "100"},
                height: {type: "sap.ui.core.CSSSize",defaultValue: "auto"}
            }
        },
		init : function () {
            $.sap.includeStyleSheet("webapp/controls/invCharts/chartjs/dist/Chart.css");
            $.sap.require("MyUI5WebApp/controls/invCharts/chartjs/dist/Chart");
        },

		renderer : function (oRm, oControl) {
            oRm.write("<canvas ")
            oRm.addStyle("width", oControl.getProperty('width'));
            oRm.addStyle("height", oControl.getProperty('height'));
            oRm.writeClasses();
            oRm.writeControlData(oControl);
            oRm.writeStyles();
            oRm.write(">");
            oRm.write("</canvas>");
        },
        onAfterRendering: function(){
            //this.show()
        },
        getChart: function(){
            return this.multiLineChart;
        },

        show: function(dataSets, labels, type) {
            if(!this.ctx){
                let query = `canvas#${this.getId()}`
                this.ctx = document.querySelector(query).getContext("2d");
                this.ctx.save();
            }else{
                this.ctx.restore()
            }
            try {
                    type = type || this.getChartType();
                    let config = this.getChartConfig(dataSets, labels, type);
                    this.multiLineChart = new Chart(this.ctx, config);
                    this.multiLineChart.update();
                    return this.multiLineChart;
            } catch (e) {
                console.error(e);
            }
        },
        setType(type){
            this.multiLineChart.update({type});
        },
        getChartConfig(dataSets, labels, type){

		    let config = {
                type: type,
                data: {
                    labels: labels,
                    datasets: dataSets
                },
                options: {
                    responsive: true,
                    title: {
                        display: this.getDisplayTitle(),
                        text: this.getTitle()
                    },
                    tooltips: {
                        mode: this.getTooltipMode(),
                        intersect: this.getTooltipIntersect(),
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                                if (label) {
                                    label += ': ';
                                }
                                label += formatter.currency(tooltipItem.yLabel);
                                return label;
                            }
                        }
                    },
                    hover: {
                        mode: this.getHoverMode(),
                        intersect: this.getHoverIntersect()
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: this.getDisplayLabelX(),
                                labelString: this.getLabelX()
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: this.getDisplayLabelY(),
                                labelString: this.getLabelY()
                            },
                            ticks: {
                                callback: function(value, index, values) {
                                    return  formatter.currency(value);
                                }
                            }
                        }]
                    }
                }
            };

            return config;
        }
	});
});
