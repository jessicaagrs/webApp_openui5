sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel",
  "sap/ui/Device"
],
function (UIComponent, JSONModel, Device) {
	"use strict";

	return UIComponent.extend("MyUI5WebApp.Component", {

		metadata : {
			manifest: "json"
		},

		init : function () {
			UIComponent.prototype.init.apply(this, arguments);
      this.getRouter().initialize();
      this.loadCustomLanguage();
			this.setDevideModel();
    },
    setDevideModel(){
			var oDeviceModel = new JSONModel(Device);
			this.setModel(oDeviceModel, "Device");
		},

    setItem(path, data){
      let str = JSON.stringify(data);
      localStorage.setItem(path, str);
    },

    getItem(path){
      let strData = localStorage.getItem(path)
      if(!strData || strData == '') return {};

      return JSON.parse(strData);
    },

    loadCustomLanguage() {
      let resource = this.getModel("i18n").getResourceBundle();
      let index = resource.aLocales.indexOf("");
      let custom = this.getItem('language');
      let properties = resource.aPropertyFiles[index].mProperties;
      for (const key in custom) {
          properties[key] = custom[key]
      }

      this.getModel("i18n").refresh(true)
    },

		getContentDensityClass : function() {
			if (!this._sContentDensityClass) {
				if (!sap.ui.Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},

		createContent : function() {
			var oRootView = UIComponent.prototype.createContent.apply(this, arguments);
			return oRootView;
		}
	});
});
