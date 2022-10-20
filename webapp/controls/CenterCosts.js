sap.ui.define([
    "sap/ui/core/Control",
    "MyUI5WebApp/model/formatter"
], function (Control, formatter) {
	"use strict";
	return Control.extend("MyUI5WebApp.controls.CenterCosts", {
		metadata : {
            properties : {
				centerCost: 	{type : "object", defaultValue :{}},
				centerCost2: 	{type : "object", defaultValue :{}},
				centerCost3: 	{type : "object", defaultValue :{}},
				centerCost4: 	{type : "object", defaultValue :{}},
				centerCost5: 	{type : "object", defaultValue :{}},
                breakLine : {type : "boolean", defaultValue :false}
			}
        },
        formatter: formatter,
		init : function () {
            this.cssEtyle = 'padding: 1px 2px 1px 1px; background: #227093; border-radius: 3px;display: inline;	line-height: 1.5em;margin-right: 2px;color: #FFF;';
        },

		renderer : function (oRM, oControl) {
            oRM.write("<div");
            oRM.writeControlData(oControl);
            oRM.write(">");
            if(formatter.dimActive(oControl.getCenterCost().Active)){
                oRM.write("<span style='"+ this.cssEtyle  +"'>");
                oRM.write(oControl.getCenterCost().DimCode + "°");
                oRM.write(oControl.getCenterCost().OcrName);
                oRM.write("</span>");
                if(oControl.getBreakLine())
                    oRM.write("<br>");
            }
            if(formatter.dimActive(oControl.getCenterCost2().Active)){
                oRM.write("<span style='"+ this.cssEtyle  +"'>");
                oRM.write(oControl.getCenterCost2().DimCode + "°");
                oRM.write(oControl.getCenterCost2().OcrName);
                oRM.write("</span>");
                if(oControl.getBreakLine())
                    oRM.write("<br>");
            }
            if(formatter.dimActive(oControl.getCenterCost3().Active)){
                oRM.write("<span style='"+ this.cssEtyle  +"'>");
                oRM.write(oControl.getCenterCost3().DimCode + "°");
                oRM.write(oControl.getCenterCost3().OcrName);
                oRM.write("</span>");
                if(oControl.getBreakLine())
                   oRM.write("<br>");
            }
           if(formatter.dimActive(oControl.getCenterCost4().Active)){
                oRM.write("<span style='"+ this.cssEtyle  +"'>");
                oRM.write(oControl.getCenterCost4().DimCode + "°");
                oRM.write(oControl.getCenterCost4().OcrName);
                oRM.write("</span>");
                if(oControl.getBreakLine())
                    oRM.write("<br>");
            }
            if(formatter.dimActive(oControl.getCenterCost5().Active)){
                oRM.write("<span style='"+ this.cssEtyle  +"'>");
                oRM.write(oControl.getCenterCost5().DimCode + "°");
                oRM.write(oControl.getCenterCost5().OcrName);
                oRM.write("</span>");
            }
			oRM.write("</div>");
        },

	});
});
