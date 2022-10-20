sap.ui.define(
	[
		"MyUI5WebApp/src/app/BaseController",
		"sap/m/MessageToast",
		'MyUI5WebApp/model/RestModel',
		"sap/ui/model/Filter",
	    "sap/ui/model/FilterOperator",
		"sap/ui/core/Fragment",
		"sap/base/util/deepExtend",

	],
	function (BaseController, MessageToast, RestModel, Filter, FilterOperator, Fragment, deepExtend) {
	"use strict";

	return BaseController.extend("MyUI5WebApp.src.pages.listaTarefas.ListaTarefas", {

		_oDialog: null,

		onInit : function () {
			this.listModel = this.createRestModel("todos");
			this.listModel.get();
			this.getView().setModel(this.listModel);
			
		},

		searchTasks: function (oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
				if (sQuery) {
				aFilter.push(new Filter("title", FilterOperator.Contains, sQuery));
			}
			var oList = this.byId("idTasksTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);		
		},

		onOpenDialog : function (oEvent) {
			var oSelectedItem = oEvent.getSource().getParent();
            var oBindingContext = oSelectedItem.getBindingContext();
                if (!this._oDialog) {
                    this._oDialog = sap.ui.xmlfragment("MyUI5WebApp.src.pages.listaTarefas.Dialog", this);
                }
				this.getView().addDependent(this._oDialog);
                this._oDialog.setBindingContext(oBindingContext);
                this._oDialog.open();
		},

		onButtonPress: function(oEvent){
			var oDialog = oEvent.getSource().getParent();
			oDialog.close();
		},

		taskDelete: function(oEvent) {
			oEvent.getSource().removeItem(oEvent.getParameter("listItem"));
		},

		addRow: function(oEvent){
			var oModel   = this.getView().getModel();                              
			var aRows    = oModel.getProperty("/");      
			var oThisObj = oEvent.getSource().getBindingContext();     
			var item     = { id: null, title: null, completed: null} 
			var message = this.getView().getModel("i18n").getResourceBundle().getText("Commom.message");
			var index = $.map(aRows, function(obj, index) {                      
				if(obj === oThisObj) {
					return index;
				}
			});
		
			aRows.splice(index, 0, item);                                         
			oModel.setProperty("/", aRows);     
			sap.m.MessageToast.show(message,{duration:3500});
		}
	
	});

});
