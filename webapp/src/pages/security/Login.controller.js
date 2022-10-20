sap.ui.define(
	[
		"MyUI5WebApp/src/app/BaseController",
		"sap/m/MessageToast",
		"MyUI5WebApp/model/RestModel",
	],
	function (BaseController, MessageToast, RestModel) {
	"use strict";

	return BaseController.extend("MyUI5WebApp.src.pages.security.Login", {
		onInit : function(){

			var that = this;
			this.byId("MyUI5WebAppLoginPage").attachBrowserEvent("keypress", oEvent =>{
				if(oEvent.keyCode != jQuery.sap.KeyCodes.ENTER) return;

				that.onLogin();
			});

			this.UserCredentials = {
				UserName: "",
				Password:"",
				grant_type : 'password'
			};
		},


		onLogin : function(oEvent){
			this.UserCredentials.UserName = this.byId("userName").getValue()
			this.UserCredentials.Password = this.byId("userPass").getValue()

			if(!this.UserCredentials.UserName || !this.UserCredentials.Password) {
				MessageToast.show("Infome o usuário e senha");
				return;
			}

			this.setUserSession(this.UserCredentials)
			this.getRouter().navTo("listaTarefas")
		},

	});

});
