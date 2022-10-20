sap.ui.define([
    "sap/m/SearchField",
    "MyUI5WebApp/model/formatter"
], function (SearchField, formatter) {
	"use strict";
	return SearchField.extend("MyUI5WebApp.controls.CenterCostsSearch", {
		metadata : {
            properties : {
				dimension: 	{type : "int", defaultValue :-1}
			}
        },

		init : function () {

        },
        renderer : {}
	});
});
