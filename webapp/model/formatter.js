sap.ui.define([
  "MyUI5WebApp/src/app/BaseController",
], function (BaseController) {
	"use strict";
  return {

    formatUpperCase: function(sName) {
      if(!sName)
        return;
      return sName && sName.toUpperCase();
    },

    formatCaptalize: function(sName){
      if(!sName) return;

      return sName[0].toUpperCase() + sName.slice(1);
    },

    dimActive : function(dimActive){
      return (dimActive == 'Y');
    },

    formatRequestPurchaseStatusDescription :  function (satusId) {
      switch (satusId) {
        case "O":
          return "Aberto";
        case "Y":
          return "Aprovado";
        case "C":
          return "Fechado"
        case "W":
          return "Aguardando Autorização";
        default:
          return "Não Definido";
      }
		},
    dateNow : function(){
      var data = new Date().toISOString();
      return data.substring(0, data.length - 1);
    },
    getPreviousMothData(dateObj){
      let tempDateObj = new Date(dateObj);

      if(tempDateObj.getMonth) {
        tempDateObj.setMonth(tempDateObj.getMonth() - 1);
      } else {
        tempDateObj.setYear(tempDateObj.getYear() - 1);
        tempDateObj.setMonth(12);
      }

      return tempDateObj
    },

    getIdFromStringEndPoint: function(sEndPoint){
        var arr = sEndPoint.split("/");
        var objectId = arr[arr.length-1];
        return objectId;
    },

    boolToYesNo : function(booleanValue){
      var resource = this.getView().getModel("i18n").getResourceBundle();
      if(booleanValue)
        return resource.getText("Commom.Yes");
      else
        return resource.getText("Commom.No");
    },
    yesNoToBool : function(stringYesOrNo){

      if(stringYesOrNo == "Y")
         return true;
      else
        return false;
    },
    yesNoToState : function(stringYesOrNo){

      if(stringYesOrNo == "Y")
         return 'Success';
      else
        return "None";
    },

    documentType : function(enumDocumentType){
      var resource = this.getView().getModel("i18n").getResourceBundle();
      switch (enumDocumentType) {
        case 1470000113:
          return resource.getText("Commom.Menu.RequestPurchese");
        default:
          return "Não Definido";
      }
    },

    getStateOfPriority: function(bUrgent) {
      if(bUrgent)
        return sap.ui.core.ValueState.Error
      else
        return sap.ui.core.ValueState.None;
    },

    getIndexOfPath : function(sPath){
      var pathArray = sPath.split("/");
			var sIndex = pathArray[pathArray.length - 1];
      var index = Number.parseInt(sIndex);
      return index;
    },

    formatRequestPurchaseStateById :  function (statusId) {

      switch (statusId) {

        case 'O':
          return "None"
        case 'C':
          return "Error";
        case 'W':
          return "Warning";
        case 'Y':
          return "Success";
      }
    },
    showCancelButton :  function (statusId) {
      switch (statusId) {
        case 'N':
          return true;
        case 'W':
          return true;
        default:
          return false;
      }
    },
    numberToPriority :  function (priorit) {
      switch (priorit) {
        case "2":
          return "High";
        case "1":
          return "Medium";
        case "0":
          return "Low";
        default:
          return "None";
      }
    },
    maxRecordsPerSearch : function(iValue){
      if (iValue < 50) {
				return "Success";
			} else if (iValue >= 50 && iValue < 101 ) {
				return "None";
			} else if (iValue >= 101 && iValue < 151 ) {
				return "Warning";
			} else {
				return "Error";
			}
    },
    formatIconColor : function(iValue){
      if (iValue < 50) {
				return "Positive";
			} else if (iValue >= 50 && iValue < 101 ) {
				return "Neutral";
			} else if (iValue >= 101 && iValue < 151 ) {
				return "Critical";
			} else {
				return "Negative";
			}
    },
    isEmptyModel : function(oModel){
      var modelStr = JSON.stringify(oModel);
      return modelStr === "{}";
    },
    currency: function(amount) {
      if(amount == null)
       return "";

      var currencyFormatter = new sap.ui.model.type.Currency({decimals:2});
      var formated = currencyFormatter.formatValue([amount.toString(),'R$ '], 'string');
      return formated;
    },
    formatNegativePositiveValue : function(nValue){
      if(nValue < 0)
        return sap.ui.core.ValueState.Error;
      else if(nValue > 0)
       return sap.ui.core.ValueState.Success;
      else
        return sap.ui.core.ValueState.None;
    },
    percentStateCritical:function(percent){

      if(percent > 0 && percent < 60)
        return sap.ui.core.ValueState.Success;
      else if(percent >= 60 && percent < 80)
        return sap.ui.core.ValueState.Warning;
      else if(percent >= 80 && percent <= 100)
      return sap.ui.core.ValueState.Error;
      else {
        return sap.ui.core.ValueState.None;
      }

    },
    listContainItems(list){
      if(!Array.isArray(list))
        return false;

      return (list.length > 0);
    },
    alertWasUnread(yesNo){
      if(yesNo === 'N') return true;
      return false;
    }
  };

}, true);
