sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"

], function(Controller, Fragment, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("AssetPM.controller.UrgentRequest", {
		onInit: function() {
			var that = this;
			var oTechObjectModel = this.getOwnerComponent().getModel("Data").getProperty("/ProductCollection");
			var oModel = new sap.ui.model.json.JSONModel();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.attachRouteMatched(function(oEvent) {
				var sObject = oEvent.getParameter("arguments").techObject;
				for (var i = 0; i < oTechObjectModel.length; i++) {
					if (oTechObjectModel[i].Product === sObject) {
						oModel.setData(oTechObjectModel[i]);
						break;
					}
				}
				that.getView().setModel(oModel, "ObjectModel");
			});
			this.byId("start").setDateValue(new Date());
			this.byId("expectedStart").setDateValue(new Date());
			// Create a JSON model from an object literal
			var oModelT = new sap.ui.model.json.JSONModel({
				techObject: ""
			});
			// Assign the model object to the SAPUI5 core
			sap.ui.getCore().setModel(oModelT);
		},
		onChangeCamera: function(oEvt) {
			var oFileUploader = oEvt.getSource();
			var oView = this.getView();
			var aFiles = oEvt.getParameters().files;
			var currentFile = aFiles[0];
			this.byId("iImageTicket").setSrc(currentFile);

		},
		onValueHelpProblem: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView = this.getView();

			if (!this._pValueHelpProblem) {
				this._pValueHelpProblem = Fragment.load({
					id: "selectProblem",
					name: "AssetPM.view.HelpDialogProblem",
					controller: this
				}).then(function(oDialog) {
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
			this._pValueHelpProblem.then(function(oDialog) {
				oDialog.mProperties.title = "Problem";
				oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
				oDialog.open(sInputValue);
			});
		},
		onValueHelpProblemClose: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			oEvent.getSource().getBinding("items").filter([]);
			if (!oSelectedItem) {
				return;
			}
			this.byId("problem").setValue(oSelectedItem.getTitle());
		},
		onValueHelpPlanner: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView = this.getView();

			if (!this._pValueHelpPlanner) {
				this._pValueHelpPlanner = Fragment.load({
					id: "selcetPlanner",
					name: "AssetPM.view.HelpDialogPlanner",
					controller: this
				}).then(function(oDialog) {
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
			this._pValueHelpPlanner.then(function(oDialog) {
				oDialog.mProperties.title = "Problem";
				oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
				oDialog.open(sInputValue);
			});
		},
		onValueHelpPlannerClose: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			oEvent.getSource().getBinding("items").filter([]);
			if (!oSelectedItem) {
				return;
			}
			this.byId("group").setValue(oSelectedItem.getTitle());
		},
		onValueHelpReporter: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView = this.getView();

			if (!this._pValueHelpReporter) {
				this._pValueHelpReporter = Fragment.load({
					id: "selcetReporter",
					name: "AssetPM.view.HelpDialogReporter",
					controller: this
				}).then(function(oDialog) {
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
			this._pValueHelpReporter.then(function(oDialog) {
				oDialog.mProperties.title = "Problem";
				oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
				oDialog.open(sInputValue);
			});
		},
		onValueHelpReporterClose: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			oEvent.getSource().getBinding("items").filter([]);
			if (!oSelectedItem) {
				return;
			}
			this.byId("reporter").setValue(oSelectedItem.getTitle());
		},
		onValueHelpPlant: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView = this.getView();

			if (!this._pValueHelpPlant) {
				this._pValueHelpPlant = Fragment.load({
					id: "selcetPlant",
					name: "AssetPM.view.HelpDialogPlant",
					controller: this
				}).then(function(oDialog) {
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
			this._pValueHelpPlant.then(function(oDialog) {
				oDialog.mProperties.title = "Problem";
				oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
				oDialog.open(sInputValue);
			});
		},
		onValueHelpPlantClose: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			oEvent.getSource().getBinding("items").filter([]);
			if (!oSelectedItem) {
				return;
			}
			this.byId("wc").setValue(oSelectedItem.getTitle());
		},
		onValueHelpSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Name", FilterOperator.Contains, sValue);

			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		onNavBack: function() {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("home", {}, true);
		},

		onPressReset: function() {
			var oView = this.getView();
			oView.byId("problem").setValue("");
			oView.byId("problem").destroyTokens();
			oView.byId("cause").setValue("");
			oView.byId("priority").setValue("");
			oView.byId("group").setValue("");
			oView.byId("description").setValue("");
			oView.byId("reporter").setValue("");
			oView.byId("wc").setValue("");
			this.byId("start").setDateValue(new Date());
			this.byId("expectedStart").setDateValue(new Date());
		},
		onPressSave: function() {}
	});
});