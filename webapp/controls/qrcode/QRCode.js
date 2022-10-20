sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";

	return Control.extend("MyUI5WebApp.controls.qrcode.QRCode", {

		metadata: {
			properties: {
				width: {  type: "sap.ui.core.CSSSize", defaultValue: "128" },
				height: { type: "sap.ui.core.CSSSize", defaultValue: "128"},
				value: { type: "object", defaultValue: {} },
				colorDark : { type: "string", defaultValue: "#000000" },
				colorLight  : { type: "string", defaultValue: "#FFFFFF" },
				correctLevel  : { type: "int", defaultValue: 2 },
			}
		},

		init: function () {
			$.sap.require("MyUI5WebApp/controls/qrcode/davidshimjs-qrcodejs-04f46c6/qrcode")
		},

		onAfterRendering: function () {
			const value = JSON.stringify(this.getValue());
			const control =  document.getElementById(this.getId());
			this.qrCode = this.qrCode = new QRCode(control, {
				text: value,
				width: this.getWidth(),
				height: this.getHeight(),
				colorDark : this.getColorDark(),
				colorLight : this.getColorLight(),
				correctLevel : this.getCorrectLevel()
			});

			console.log(this.qrCode,"QR CODE")
		},

		makeCode(value){
			this.qrCode.makeCode(value)
		},

		renderer: function (oRM, oControl) {

			oRM.write(`<div `);
			oRM.writeClasses();
			oRM.writeControlData(oControl);
			oRM.writeStyles();
			oRM.write("> </div>");

		}
	});
});
