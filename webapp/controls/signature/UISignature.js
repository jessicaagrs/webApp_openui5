
sap.ui.define([
    "sap/ui/core/Control",
    "MyUI5WebApp/controls/signature/signature_pad"
], function (Control, SignaturePadjs) {
	"use strict";
    return Control.extend("MyUI5WebApp.controls.signature.UISignature", {
        signaturePad: null,
        metadata: {
            properties: {
                "width" : {type: "sap.ui.core.CSSSize", defaultValue: "300px"},
                "height": {type: "sap.ui.core.CSSSize", defaultValue: "100px"},
                "penMinWidth": {type: "float", defaultValue: 0.5},
                "penMaxWidth": {type: "float", defaultValue: 1.0},
                "bgColor": {type: "sap.ui.core.CSSColor", defaultValue: "lightgrey"},
                "penColor": {type: "sap.ui.core.CSSColor", defaultValue: "black"},
                "underline": {type: "boolean", defaultValue: false}
            }
        },

        resizeCanvas: function resizeCanvas() {
            var canvas = document.querySelector("canvas");
            if(canvas) {
            var ratio =  Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
            }
        },
        activate: function() {
            var canvas = document.querySelector("canvas");
            try {
                    let setting = this.getSettings();
                    this.signaturePad = new SignaturePad(canvas, setting);
                    this.drawUnderline()
            } catch (e) {
                console.error(e);
            }
        },

        getSettings(){
            let setting = {};
            setting.minWidth = this.getProperty("penMinWidth")
            setting.maxWidth = this.getProperty("penMaxWidth")
            setting.backgroundColor= this.getProperty("bgColor")
            setting.penColor= this.getProperty("penColor")
            return setting;
        },

        drawUnderline(){
            if(!this.getProperty("underline")) return;

            let ctx= this.signaturePad._ctx;

            let width = new Number(this.getProperty('width').replace('px',""))
            let height = new Number(this.getProperty('height').replace('px',""))
            ctx.beginPath();
            let lineInit, lineEnd, lineTop;
            lineInit = (width/ 100) * 5;
            lineEnd = (width/ 100) * 95;
            lineTop = (height/ 100) * 75;
            ctx.moveTo(lineInit, lineTop);
            ctx.lineTo(lineEnd, lineTop);
            ctx.stroke();
        },
        clear: function() {
            if (this.signaturePad){
                this.signaturePad.clear()
               this.activate();
            }else
                console.error('signaturePad não inicializado, é necessário chamar o método activate(), após a renderização da view.')
        },
        toDataURL: function() {
            return this.signaturePad.toDataURL();
        },
        isEmpty: function() {
            return this.signaturePad.isEmpty();
        },
        fromDataURL(dataURL){
            this.activate();
            this.signaturePad.fromDataURL(dataURL);
        },

        renderer: function(oRm, oControl) {
            /* var thickness = parseInt(oControl.getProperty('thickness'), 10); */
            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.addStyle("width", oControl.getProperty('width'));
            oRm.addStyle("height", oControl.getProperty('height'));
            oRm.addStyle("background-color", oControl.getProperty('bgColor'));
            oRm.writeStyles();

            oRm.writeClasses();
            oRm.write(">");

            oRm.write("<canvas width='" + oControl.getProperty('width') + "' " +
            "height='" + oControl.getProperty('height') + "'");
            oRm.writeControlData(oControl);
            oRm.addStyle("width", oControl.getProperty('width'));
            oRm.addStyle("height", oControl.getProperty('height'));
            oRm.writeStyles();
            oRm.write("></canvas>");
            oRm.write("</div>");

        }
        }
    );


});
