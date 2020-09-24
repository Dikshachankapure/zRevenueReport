sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"RevenueReport/ZREVENUE_REPORT/jsondata/InitPage",
	'sap/viz/ui5/format/ChartFormatter',
	'sap/viz/ui5/api/env/Format',
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
		'sap/m/MessageBox'
], function (Controller, JSONModel, MessageToast, formatter, Filter, FilterOperator, ChartFormatter, Format,
	InitPageUtil,  Export, ExportTypeCSV, MessageBox) {
	"use strict";

	return Controller.extend("RevenueReport.ZREVENUE_REPORT.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf RevenueReport.ZREVENUE_REPORT.view.View2
		 */
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("View2").attachPatternMatched(this.onEditMatched, this);

			var oModel = this.getOwnerComponent().getModel("MaterialSet");
			this.getView().setModel(oModel, "oModelMaterial");

			var oModelMat = this.getOwnerComponent().getModel("MatChartDataSet");
			this.getView().setModel(oModelMat, "oModelMaterialChart");

			Format.numericFormatter(ChartFormatter.getInstance());
			var formatPattern = ChartFormatter.DefaultPattern;
			var oModelChart = this.getOwnerComponent().getModel("ChartDataSet");
			this.getView().setModel(oModelChart, "oModelCustAmt");

			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");

			oVizFrame.setVizProperties({
				plotArea: {
					dataLabel: {
						formatString: formatPattern.SHORTFLOAT_MFD2,
						visible: true
					}
				},
				valueAxis: {
					label: {
						formatString: formatPattern.SHORTFLOAT
					},
					title: {
						visible: false
					}
				},
				categoryAxis: {
					title: {
						visible: false
					}
				},
				title: {
					visible: true,
					text: 'Revenue Report'
				}
			});

			var oPopOver = this.getView().byId("idPopOver");
			oPopOver.connect(oVizFrame.getVizUid());
			oPopOver.setFormatString(formatPattern.STANDARDFLOAT);

			var oVizFrameShip = this.oVizFrame = this.getView().byId("idVizFrameShip");
			oVizFrameShip.setVizProperties({
				plotArea: {
					dataLabel: {
						formatString: formatPattern.SHORTFLOAT_MFD2,
						visible: true
					}
				},
				valueAxis: {
					label: {
						formatString: formatPattern.SHORTFLOAT
					},
					title: {
						visible: false
					}
				},
				categoryAxis: {
					title: {
						visible: false
					}
				},
				title: {
					visible: true,
					text: 'Revenue Report'
				}
			});

			var oPopOverQty = this.getView().byId("idPopOverShip");
			oPopOverQty.connect(oVizFrameShip.getVizUid());
			oPopOverQty.setFormatString(formatPattern.STANDARDFLOAT);

		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		Gotopage1: function () {
			this.getRouter().navTo("View1", {}, true);

		},

		onEditMatched: function (oEvent) {
			var oParameters = oEvent.getParameters();

			if (oParameters.arguments.Type == "TypeA") {
				var oModelData = this.getOwnerComponent().getModel("EndCustomerSet"); //get the data from model 
				this.getView().setModel(oModelData); //set the data to model

				var oModel = this.getView().getModel();

				var company = this.getView().byId("objcmp");

				var Amount = this.getView().byId("objcmp");

				var that = this;

				var otableCust = this.getView().byId("tablCust");
				otableCust.setVisible(true);
				var otableShip = this.getView().byId("panelShiftAmt");
				otableShip.setVisible(false);

				var oPanelChartCust = this.getView().byId("settingsPanel");
				oPanelChartCust.setVisible(true);

				var oPanelChartShip = this.getView().byId("settingsPanelShip");
				oPanelChartShip.setVisible(false);

				if (oParameters.arguments.Customer !== "" || oParameters.arguments.Customer !== null) {
					this.Customer = oParameters.arguments.Customer;
					if (oModel.getData().EndCustomerAmt.length > 0) {
						for (var i = 0; i < oModel.getData().EndCustomerAmt.length; i++) {
							if (oModel.getData().EndCustomerAmt[i].Customer.toString() === this.Customer) {

								company.setTitle(this.Customer);
								Amount.setNumber(oModel.getData().EndCustomerAmt[i].JAN);

								return false;
							}

						}
					}

				}
			} else if (oParameters.arguments.Type == "TypeB") {
				var oModelData = this.getOwnerComponent().getModel("EndCustomerQuanSet"); //get the data from model 
				this.getView().setModel(oModelData); //set the data to model

				var oModel = this.getView().getModel();

				var company = this.getView().byId("objcmp");

				var Amount = this.getView().byId("objcmp");

				var that = this;

				var otableCust = this.getView().byId("tablCust");
				otableCust.setVisible(true);
				var otableShip = this.getView().byId("panelShiftAmt");
				otableShip.setVisible(false);

				var oPanelChartCust = this.getView().byId("settingsPanel");
				oPanelChartCust.setVisible(true);

				var oPanelChartShip = this.getView().byId("settingsPanelShip");
				oPanelChartShip.setVisible(false);

				if (oParameters.arguments.Customer !== "" || oParameters.arguments.Customer !== null) {
					this.Customer = oParameters.arguments.Customer;
					if (oModel.getData().EndCustQua.length > 0) {
						for (var i = 0; i < oModel.getData().EndCustQua.length; i++) {
							if (oModel.getData().EndCustQua[i].Customer.toString() === this.Customer) {

								company.setTitle(this.Customer);
								Amount.setNumber(oModel.getData().EndCustQua[i].JAN);

								return false;
							}

						}
					}

				}
			} else if (oParameters.arguments.Type == "TypeC") {
				var oModelData = this.getOwnerComponent().getModel("ShipToConAmtSet"); //get the data from model 
				this.getView().setModel(oModelData); //set the data to model

				var oModel = this.getView().getModel();

				var company = this.getView().byId("objcmp");

				var Amount = this.getView().byId("objcmp");

				var that = this;

				var otableCust = this.getView().byId("tablCust");
				otableCust.setVisible(false);
				var otableShip = this.getView().byId("panelShiftAmt");
				otableShip.setVisible(true);

				var oPanelChartCust = this.getView().byId("settingsPanel");
				oPanelChartCust.setVisible(false);

				var oPanelChartShip = this.getView().byId("settingsPanelShip");
				oPanelChartShip.setVisible(true);

				if (oParameters.arguments.Customer !== "" || oParameters.arguments.Customer !== null) {
					this.Customer = oParameters.arguments.Customer;
					if (oModel.getData().ShipToConAmt.length > 0) {
						for (var i = 0; i < oModel.getData().ShipToConAmt.length; i++) {
							if (oModel.getData().ShipToConAmt[i].Customer.toString() === this.Customer) {

								company.setTitle(this.Customer);
								Amount.setNumber(oModel.getData().ShipToConAmt[i].JAN);

								return false;
							}

						}
					}

				}
			} else if (oParameters.arguments.Type == "TypeD") {
				var oModelData = this.getOwnerComponent().getModel("ShipToConSet"); //get the data from model 
				this.getView().setModel(oModelData); //set the data to model

				var oModel = this.getView().getModel();

				var company = this.getView().byId("objcmp");

				var Amount = this.getView().byId("objcmp");

				var that = this;

				var otableCust = this.getView().byId("tablCust");
				otableCust.setVisible(false);
				var otableShip = this.getView().byId("panelShiftAmt");
				otableShip.setVisible(true);

				var oPanelChartCust = this.getView().byId("settingsPanel");
				oPanelChartCust.setVisible(false);

				var oPanelChartShip = this.getView().byId("settingsPanelShip");
				oPanelChartShip.setVisible(true);

				if (oParameters.arguments.Customer !== "" || oParameters.arguments.Customer !== null) {
					this.Customer = oParameters.arguments.Customer;
					if (oModel.getData().ShipToConQty.length > 0) {
						for (var i = 0; i < oModel.getData().ShipToConQty.length; i++) {
							if (oModel.getData().ShipToConQty[i].Customer.toString() === this.Customer) {

								company.setTitle(this.Customer);
								Amount.setNumber(oModel.getData().ShipToConQty[i].JAN);

								return false;
							}

						}
					}

				}
			}
		},
			handleExcelExport: function() {
			// getting model into oModel variable.
			var oModel = this.getView().getModel("oModelMaterial");
			var oExport = new sap.ui.core.util.Export({
				exportType: new sap.ui.core.util.ExportTypeCSV({
					// for xls....
					fileExtension: "xls",
					separatorChar: "\t",
					charset: "utf-8",
					mimeType: "application/vnd.ms-excel"

					// for CSV....
					/* charset: "utf-8",
					fileExtension:"csv",
					separatorChar:",",
					mimeType:"application/csv" */
				}),
				models: oModel,

				rows: {
					path: "/Material"
				},
				columns: [{
					name: "MaterialText",
					template: {
						content: "{MaterialText}"
					}
				}, {
					name: "APR",
					template: {
						content: "{APR}"
					}
				}, {
					name: "MAY",
					template: {
						content: "{MAY}"
					}
				}, {
					name: "JUN",
					template: {
						content: "{JUN}"
					}
				},{
					name: "JUL",
					template: {
						content: "{JUL}"
					}
				},{
					name: "AUG",
					template: {
						content: "{AUG}"
					}
				},{
					name: "SEP",
					template: {
						content: "{SEP}"
					}
				},{
					name: "OCT",
					template: {
						content: "{OCT}"
					}
				},{
					name: "NOV",
					template: {
						content: "{NOV}"
					}
				},{
					name: "DEC",
					template: {
						content: "{DEC}"
					}
				},{
					name: "JAN",
					template: {
						content: "{JAN}"
					}
				},{
					name: "FEB",
					template: {
						content: "{FEB}"
					}
				},{
					name: "MAR",
					template: {
						content: "{MAR}"
					}
				}
				]
			});
			oExport.saveFile().catch(function(oError) {
				sap.m.MessageToast.show("Generate is not possible beause no model was set");
			}).then(function() {
				oExport.destroy();
			});
		}

	});

});