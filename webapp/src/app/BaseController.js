sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"MyUI5WebApp/src/pages/exceptions/Exeption.controller",
		"MyUI5WebApp/model/formatter",
		"MyUI5WebApp/model/RestModel",
		
	], function (Controller, Exeption, formatter, RestModel) {
	"use strict";

	return Controller.extend("MyUI5WebApp.src.app.BaseController", {
    fmt: formatter,
    USER_SESSION_PATH: "currentUser",
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);

		},

		setUserTheme : function(){
			var user = this.getUserSession();
			if(!user)
				return;

			if(user.UserSettings == undefined)
				return;

			if(!user.UserSettings.Theme)
				return;

			var theme = sap.ui.getCore().getConfiguration().getTheme();

			if(theme != user.UserSettings.Theme)
				sap.ui.getCore().applyTheme(user.UserSettings.Theme);
		},

		api :{
			token : 'tokenEndPoint',
			user: 'User.json',
			notification: 'Notifications.json',
			settings:'Settings.json'
		},

		getServerUrl(){
			let base = [];
			let serve = this.getOwnerComponent().getMetadata().getConfig().serviceUrl;
			base.push(serve);

			for (let index = 0; index < arguments.length; index++) {
				const element = arguments[index];
				base.push(element);
			}

			return base.join('/');
		},

		getModel : function (sName) {
			return this.getView().getModel(sName);
		},

		setModel : function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		getText: function(sKey){
			return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sKey);
		},

		onNavBack : function(sRoute, mData) {
				window.history.go(-1);
		},

		getIndexOfPath : function(sPath){
			var pathArray = sPath.split("/");
			var sIndex = pathArray[pathArray.length - 1];
			var index = Number.parseInt(sIndex);
			return index;
		},

		showExeption(exeption){
			let ctrl =new Exeption();
			ctrl.show(exeption);
		},

		getUserSession : function(){
			return this.getItem(this.USER_SESSION_PATH);
		},

		setUserSession : function(userData){
			delete userData.Password ;
			this.setItem(this.USER_SESSION_PATH, userData)
		},

		destroyUserSession : function(){
			this.removeItem(this.USER_SESSION_PATH);
		},

		setItem(path, data){
			localStorage.setItem(path,JSON.stringify(data));

		},
		getItem(path){
			let strData = localStorage.getItem(path)
			if(!strData || strData == '') return null;

			return JSON.parse(strData);
		},

		removeItem(path){
			localStorage.removeItem(path);
		},

    	extractObjects: (oEvent) => {
			let objects = oEvent.getParameter("selectedContexts").map(x => x.getObject())
			return objects;
		},
		createRestModel(path) {
			
			const uri = path.startsWith("http") ? path : this.getServerUrl(path);
			const model = new RestModel();
			model.setUrl(uri);
			return model;

		},
		createLocalRestModel(path) {
			console.log("sucess log")
			
			const uri = path.startsWith("http") ? path : this.getLocalUrl(path);
			const model = new RestModel();
			model.setUrl(uri);
			return model;

		},

		getLocalUrl() {
			let base = [];
			let serve = this.getOwnerComponent().getMetadata().getConfig().localDataUrl;
			base.push(serve);

			for (let index = 0; index < arguments.length; index++) {
				const element = arguments[index];
				base.push(element);
			}

			return base.join('/');
		},
	});
});
