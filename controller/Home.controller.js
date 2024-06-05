sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, Fragment, Filter, FilterOperator) {

	"use strict";

	return Controller.extend("AssetPM.controller.Home", {
		onInit: function() {

		},
		onPress: function(oEvent) {
			var sValue = this.byId("objectInput").mProperties.value;

			this.getOwnerComponent().getRouter().navTo("request", {
				techObject: sValue
			});
		},
		onValueHelpRequest: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView = this.getView();

			if (!this._pValueHelpDialog) {
				this._pValueHelpDialog = Fragment.load({
					id: oView.getId(),
					name: "AssetPM.view.ValueHelpDialog",
					controller: this
				}).then(function(oDialog) {
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
			this._pValueHelpDialog.then(function(oDialog) {
				oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				oDialog.open(sInputValue);
			});
		},
		onValueHelpSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Name", FilterOperator.Contains, sValue);

			oEvent.getSource().getBinding("items").filter([oFilter]);
		},

		onValueHelpClose: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem"),
				oView = this.getView();
			oEvent.getSource().getBinding("items").filter([]);

			if (!oSelectedItem) {
				return;
			}

			this.byId("objectInput").setValue(oSelectedItem.getTitle());
		}

	});
});