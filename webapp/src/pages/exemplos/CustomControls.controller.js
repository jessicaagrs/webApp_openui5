sap.ui.define(
	[
		"MyUI5WebApp/src/app/BaseController",
		"sap/m/MessageToast",
		'MyUI5WebApp/model/RestModel',
		'sap/ui/unified/ColorPickerPopover',
	],
	function (BaseController, MessageToast,RestModel, ColorPickerPopover) {
	"use strict";

	return BaseController.extend("MyUI5WebApp.src.pages.exemplos.CustomControls", {

		onInit : function () {
			this.setModel(new RestModel(),"signature");
			this.setModel(new RestModel(),"SelectedCenterCosts");
			this.setModel(new RestModel(),"htmlEditor");
			this.ConfgQRCode();
			
		},
		ConfgQRCode(){
			const qrData = {ItemCode: "I00001", ItemName:"Nome do item"};
			const valueStr = JSON.stringify(qrData);
			const qrCodeModelData = {ValueString: valueStr, Value: qrData}
			this.setModel(new RestModel(qrCodeModelData), "qrCodeModel");

		},
		activateSignature(oEvent){
			let panel = oEvent.getSource().getParent().getParent();
			panel.setExpanded(true);
			this.byId("signature").activate();
		},
		exportSignature(){
			let input = this.byId("signature");
			let img = input.toDataURL();
			this.getModel("signature").setProperty("/signatureIMG", img);
			input.clear()
		},
		clearSignature(oEvent){
			let input = this.byId("signature");
			input.clear();
			this.getModel("signature").setProperty("/signatureIMG", "");

		},
		openDefaultModeSample: function (oEvent) {
			this.inputId = oEvent.getSource().getId();
			if (!this.oColorPickerPopover) {
				this.oColorPickerPopover = new ColorPickerPopover("oColorPickerPopover", {
					colorString: "black",
					change: this.handlePenColorChanged.bind(this)
				});
			}
			this.oColorPickerPopover.openBy(oEvent.getSource());
    },
    makeQR(oEvent){
      const textArea = this.byId("stringValue")
      const qrinput = 	this.byId("qrinput")
      qrinput.makeCode(textArea.getValue())
   },
		handlePenColorChanged(oEvent){
			let color = oEvent.getParameter("colorString");
			MessageToast.show("Chosen color string: " + oEvent.getParameter("colorString"));
			let input = this.byId("signature");
			input.setPenColor(color);

    },

		openDefaultModeSampleCanvas: function (oEvent) {
			this.inputId = oEvent.getSource().getId();
			if (!this.oColorPickerPopover) {
				this.oColorPickerPopover = new ColorPickerPopover("oColorPickerPopover", {
					colorString: "gray",
					change: this.handleCanvasColorChanged.bind(this)
				});
			}
			this.oColorPickerPopover.openBy(oEvent.getSource());
		},
		onAfterRendering : function(){

		},
		_onRouteMatched : function (oEvent) {

		},

		onPageChanged(oEvent){
			let params = oEvent.getParameters();
			let msg = "Página atual: " + params.currentPage;
			msg += "\r\nPagina Selecionada: " + params.selectedPage;
			MessageToast.show(msg);
		},

		onSerchDimession : function(oEvent){
            let dimension = oEvent.getSource().getDimension();
            let model = this.getModel("Dimensions");

            if (!this._oDialogDimensions) {
                this._oDialogDimensions = sap.ui.xmlfragment("MyUI5WebApp.view.fragments.ChooseFromModal", this);
                this._oDialogDimensions.addStyleClass(this.getOwnerComponent().getContentDensityClass());
			}

			var modelDialog = model.getData()[dimension-1].CenterCosts;
			let modelMapped = modelDialog.map(x=>{
				return {
					Title:x.OcrCode,
					Description: x.OcrName,
					Dimension: x.DimCode
				}
			})

            this._oDialogDimensions.setModel(new RestModel(modelMapped));
            this._oDialogDimensions.setMultiSelect(false);
            this._oDialogDimensions.setRememberSelections(false);
            this._oDialogDimensions.open();
            jQuery.sap.syncStyleClass(this.getOwnerComponent().getContentDensityClass(), this.getView(), this._oDialogDimensions);
		},

		handleCloseChooseFromModalSelection(oEvent){
			var aContexts = oEvent.getParameter("selectedContexts");
			if (!aContexts || !aContexts.length)
				return;
			var centerCost = aContexts.map(
				(oContext) => {
					return oContext.getObject()
				})[0];

			let msg = "Código do Centro de Custo: " + centerCost.Title;
			msg+="\r\nDescrição: " + centerCost.Description;
			let propertyName = "/OcrName";
			if(centerCost.Dimension > 1)
				propertyName+= centerCost.Dimension;

			this.getModel('SelectedCenterCosts').setProperty(propertyName, centerCost.Description);
			MessageToast.show(msg)

		},

		fillHtmlValue(){
			this.getModel("htmlEditor").loadData(this.getServerUrl("HtmlEditor.json"));
		}


	});

});
