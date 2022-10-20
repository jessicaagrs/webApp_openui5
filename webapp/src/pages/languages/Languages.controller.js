sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",
  "MyUI5WebApp/model/RestModel",
  "sap/ui/model/Filter",
	],
	function (BaseController, RestModel, Filter) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.languages.Languages", {
			onInit: function () {
				this
					.getRouter()
					.getRoute('languages')
					.attachPatternMatched(this._onRouteMatched, this);
			},

			handleSearch: function (oEvent) {
				let filters = [];
				let sValue = oEvent.getParameter("query");
				console.log(oEvent.getSource())
				console.log(oEvent.getParameters())
				filters.push(new Filter("key", sap.ui.model.FilterOperator.Contains, sValue));
				filters.push(new Filter("value", sap.ui.model.FilterOperator.Contains, sValue));
				let filter = new Filter(filters, false)
				let oBinding = this.byId("tableLanguage").getBinding("items");
				oBinding.filter(filter);
			},
			handleSearchCustom: function (oEvent) {
				let filters = [];
				let sValue = oEvent.getParameter("query");
				console.log(oEvent.getSource())
				console.log(oEvent.getParameters())
				filters.push(new Filter("key", sap.ui.model.FilterOperator.Contains, sValue));
				filters.push(new Filter("value", sap.ui.model.FilterOperator.Contains, sValue));
				let filter = new Filter(filters, false)
				let oBinding = this.byId("tableLanguageCustom").getBinding("items");
				oBinding.filter(filter);
			},
			_onRouteMatched(oEvent) {
				this._load();
				this.showFooter(false);
			},
			_load() {
				//Local Lang
				this.setModel(new RestModel(this.CreateArrayFrom119nModel()));

				//Customs
				let custom = this.objectToList(this.getItem('language'))
				this.setModel(new RestModel(custom), "Custom");
			},
			objectToList(obj){
				let list = [];
				for (const key in obj) {
					list.push({key, value: obj[key]})
				}

				return list;
			},
			listKeyToObject(list){
				let obj = {};
				list.forEach(x =>{
					obj[x.key] = x.value;
				})
				return obj;
			},
			CreateArrayFrom119nModel(){
				let resource = this.getOwnerComponent().getModel("i18n").getResourceBundle();
				let index = resource.aLocales.indexOf("");
				if(index < 0) return;

				let properties =  resource.aPropertyFiles[index].mProperties;
				let LanguageList = [];
				for (const key in properties) {
					if (properties.hasOwnProperty(key)) {
						const element = properties[key];
						LanguageList.push({ key: key, value: element });
					}
				}

				return LanguageList;
			},
			markToEdit(oEvent) {
				let path = oEvent.getSource().getParent().getBindingContext().getPath();
				let prop = this.getModel().getProperty(path);
				let custom = this.getModel("Custom").getData().filter(x => x.key != prop.key);
				if(prop.value) custom.push(prop);
				this.getModel("Custom").setData(custom)
				this.showFooter(true);
			},
			markToEditCustom(oEvent) {
				this.showFooter(true);
        let path = oEvent.getSource().getParent().getBindingContext("Custom").getPath();
				let prop = this.getModel("Custom").getProperty(path);
				let custom = this.getModel("Custom").getData().filter(x => x.key != prop.key);
        if(prop.value) custom.push(prop);
        this.getModel("Custom").setData(custom)
			},
			_save() {
				let page = this.byId("pageLang");
				page.setBusy(true);
				let customModel = this.getModel('Custom');
				let data = customModel.getData()
				this.setItem('language', this.listKeyToObject(data));
				this.showFooter(false);
				this.getOwnerComponent().loadCustomLanguage();
				page.setBusy(false)
			},

			showFooter(show){
				this.byId("pageLang").setShowFooter(show)
			}

		});
	}
);
