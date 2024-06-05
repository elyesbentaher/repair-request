sap.ui.define([
		"sap/ui/core/UIComponent",
		"sap/ui/core/util/MockServer",
		"sap/ui/model/json/JSONModel"
	], function(UIComponent, MockServer, JSONModel) {
		"use strict";
		return UIComponent.extend("AssetPM.Component", {
			metadata: {
				manifest: "json"
			},
			init: function() {
				/***** */
				UIComponent.prototype.init.apply(this, arguments);
				// Parse the current url and display the targets of the route that matches the hash
				this.getRouter().initialize();

				var that = this;

				// Function to get the time each second
				setInterval(function() {
					var oModel = new JSONModel(this._data);
					var minutes,
						seconds,
						date = new Date();

					if (date.getSeconds() < 10) {
						seconds = "0" + date.getSeconds();
					} else {
						seconds = date.getSeconds();
					}

					if (date.getMinutes() < 10) {
						minutes = "0" + date.getMinutes();
					} else {
						minutes = date.getMinutes();
					}

					var dDay = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
						dTime = date.getHours() + ":" + minutes + ":" + seconds;
					oModel.oData.day = dDay;
					oModel.oData.time = dTime;
					that.setModel(oModel, "Date");
				}, 1000);
			}
		});
	}, /* bExport= */
	true);