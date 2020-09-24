sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"RevenueReport/ZREVENUE_REPORT/jsondata/InitPage",
	'sap/viz/ui5/format/ChartFormatter',
	'sap/viz/ui5/api/env/Format',

], function (Controller, JSONModel, MessageToast, formatter, Filter, FilterOperator, ChartFormatter, Format, InitPageUtil) {
	"use strict";

	return Controller.extend("RevenueReport.ZREVENUE_REPORT.controller.View1", {

		onInit: function () {
			var oModel = this.getOwnerComponent().getModel("EndCustomerSet");
			this.getView().setModel(oModel, "oModelEndCust");

			var oModel = this.getOwnerComponent().getModel("EndCustomerQuanSet");
			this.getView().setModel(oModel, "oModelEndCustQua");
			
				var oModel = this.getOwnerComponent().getModel("ShipToConAmtSet");
			this.getView().setModel(oModel, "oModelConAmt");

			var oModel = this.getOwnerComponent().getModel("ShipToConSet");
			this.getView().setModel(oModel, "oModelCon");

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

			var oVizFrame1 = this.oVizFrame = this.getView().byId("idVizFrame1");
			oVizFrame1.setVizProperties({
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

			var oPopOverQty = this.getView().byId("idPopOverQty");
			oPopOverQty.connect(oVizFrame1.getVizUid());
			oPopOverQty.setFormatString(formatPattern.STANDARDFLOAT);

			var oVizFrameShipAmt = this.oVizFrame = this.getView().byId("idVizFrameShip");

			oVizFrameShipAmt.setVizProperties({
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

			var oPopOverShipAmt = this.getView().byId("idPopOverShipAmt");
			oPopOverShipAmt.connect(oVizFrameShipAmt.getVizUid());
			oPopOverShipAmt.setFormatString(formatPattern.STANDARDFLOAT);

			var oVizFrameShipQty = this.oVizFrame = this.getView().byId("idVizFrameShipQty");

			oVizFrameShipQty.setVizProperties({
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

			var oPopOverShipQty = this.getView().byId("idPopOverShipQty");
			oPopOverShipQty.connect(oVizFrameShipQty.getVizUid());
			oPopOverShipQty.setFormatString(formatPattern.STANDARDFLOAT);

			//	InitPageUtil.initPageSettings(this.getView());
		},
		onSelect: function (oEvent) {
			var uomLb = this.getView().byId("lbuomid");
			var uomIn = this.getView().byId("uomid");

			if (this.getView().byId("rdb1").getSelected()) {
				uomLb.setVisible(false);
				uomIn.setVisible(false);
			} else if (this.getView().byId("rdb2").getSelected()) {
				uomLb.setVisible(true);
				uomIn.setVisible(true);
			}
		},

		onSearch: function (oEvent) {

			var companyCode = this.getView().byId("txtCompanyCd");
			var fiscalYear = this.getView().byId("fiscalyr");
			var currencyTpe = this.getView().byId("currntype");
			var rdbtnEndCust = this.getView().byId("rdbCust");
			var rdbtnShipCon = this.getView().byId("rdbCon");

			var rdbtnAmount = this.getView().byId("rdb1");
			var rdbtnQty = this.getView().byId("rdb2");
			var oPanelEndCutAmt = this.getView().byId("panelEndCutAmt");
			var oPanelEndCutQty = this.getView().byId("panelEndCutQty");

			var oPanelShipConAmt = this.getView().byId("panelShiftAmt");
			var oPanelShipConQty = this.getView().byId("panelShiftQty");

			var oPanelEndCustChartAmount = this.getView().byId("PanelEndCustChartAmt");
			var oPanelEndCustChartQty = this.getView().byId("PanelEndCustChartQty");

			var oPanelShipConChartAmount = this.getView().byId("PanelShipConChartAmt");
			var oPanelShipConChartQty = this.getView().byId("PanelShipConChartQty");

			var that = this;

			if (companyCode.getValue().trim().length === 0 || fiscalYear.getValue().trim().length === 0 ||
				currencyTpe.getValue().trim().length === 0) {
				MessageToast.show("please Fill all Data");
				return false;
			}
			/*	if (currencyTpe.getValue().trim().length === 0 ) {
					MessageToast.show("plz Select Currency Type");
					return false;
				} else if (fiscalYear.getValue().trim().length === 0) {
					MessageToast.show("Plz Select Fiscal Year");
					return false;

				}*/
			else {
				if (this.getView().byId("rdbCust").getSelected() && this.getView().byId("rdb1").getSelected()) {
					oPanelEndCutAmt.setVisible(true);
					oPanelEndCutQty.setVisible(false);
					oPanelShipConAmt.setVisible(false);
					oPanelShipConQty.setVisible(false);

					oPanelEndCustChartAmount.setVisible(true);
					oPanelEndCustChartQty.setVisible(false);

					oPanelShipConChartAmount.setVisible(false);
					oPanelShipConChartQty.setVisible(false);
					var oModelStock = this.getOwnerComponent().getModel("EndCustomerSet");
					this.getView().setModel(oModelStock);

					// oChartAmt.setVisible(true);
					//	oPanelChartAmount.setVisible(true);
					//	oPanelChartQty.setVisible(false);
					// oChartQty.setVisible(false);
					//	that.onPressChartByAmount();
					/*var oModelChart = this.getOwnerComponent().getModel("ChartDataSet");
					this.getView().setModel(oModelChart);*/

				} else if (this.getView().byId("rdbCust").getSelected() && this.getView().byId("rdb2").getSelected()) {

					oPanelEndCutQty.setVisible(true);
					oPanelEndCutAmt.setVisible(false);
					oPanelShipConAmt.setVisible(false);
					oPanelShipConQty.setVisible(false);
					oPanelEndCustChartAmount.setVisible(false);
					oPanelEndCustChartQty.setVisible(true);
					oPanelShipConChartAmount.setVisible(false);
					oPanelShipConChartQty.setVisible(false);
					var oModelStockqty = this.getOwnerComponent().getModel("EndCustomerSet");
					this.getView().setModel(oModelStockqty);

					//	oPanelChartQty.setVisible(true);
					//	oPanelChartAmount.setVisible(false);
					/*oChartQty.setVisible(true);
					oChartAmt.setVisible(false);
*/
					//	that.onPressChartByQty();
					/*var oModelChartAmt = this.getOwnerComponent().getModel("ChartDataSet");
					this.getView().setModel(oModelChartAmt);*/
				} else if (this.getView().byId("rdbCon").getSelected() && this.getView().byId("rdb1").getSelected()) {

					oPanelShipConAmt.setVisible(true);
					oPanelShipConQty.setVisible(false);
					oPanelEndCutQty.setVisible(false);
					oPanelEndCutAmt.setVisible(false);
					oPanelEndCustChartAmount.setVisible(false);
					oPanelEndCustChartQty.setVisible(false);
					oPanelShipConChartAmount.setVisible(true);
					oPanelShipConChartQty.setVisible(false);
					var oModelStockqty = this.getOwnerComponent().getModel("EndCustomerSet");
					this.getView().setModel(oModelStockqty);

				} else if (this.getView().byId("rdbCon").getSelected() && this.getView().byId("rdb2").getSelected()) {

					oPanelShipConQty.setVisible(true);
					oPanelShipConAmt.setVisible(false);
					oPanelEndCutQty.setVisible(false);
					oPanelEndCutAmt.setVisible(false);
					oPanelEndCustChartAmount.setVisible(false);
					oPanelEndCustChartQty.setVisible(false);
					oPanelShipConChartAmount.setVisible(false);
					oPanelShipConChartQty.setVisible(true);
					var oModelStockqty = this.getOwnerComponent().getModel("EndCustomerSet");
					this.getView().setModel(oModelStockqty);

				}

			}

		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onPress: function (oEvent) {

			if (this.getView().byId("rdbCust").getSelected() && this.getView().byId("rdb1").getSelected()) {
				var Revenue = oEvent.getSource().getBindingContext("oModelEndCust").getObject();

				this.getRouter().navTo("View2", {
					Customer: Revenue.Customer,
					Type: Revenue.Type

				});
			} else if (this.getView().byId("rdbCust").getSelected() && this.getView().byId("rdb2").getSelected()) {

				var RevenueQ = oEvent.getSource().getBindingContext("oModelEndCustQua").getObject();

				this.getRouter().navTo("View2", {
					Customer: RevenueQ.Customer,
					Type: RevenueQ.Type
				});
			} else if (this.getView().byId("rdbCon").getSelected() && this.getView().byId("rdb1").getSelected()) {

				var RevenueC = oEvent.getSource().getBindingContext("oModelConAmt").getObject();

				this.getRouter().navTo("View2", {
					Customer: RevenueC.Customer,
					Type: RevenueC.Type
				});
			} else if (this.getView().byId("rdbCon").getSelected() && this.getView().byId("rdb2").getSelected()) {

				var RevenueC = oEvent.getSource().getBindingContext("oModelCon").getObject();

				this.getRouter().navTo("View2", {
					Customer: RevenueC.Customer,
					Type: RevenueC.Type
				});
			}

		},

		/*	onPress: function (oEvent) {
				var Revenue = oEvent.getSource().getBindingContext("oModelEndCust").getObject();

						this.getRouter().navTo("View2", {
							Customer: Revenue.Customer,
							Type: Revenue.Type

						});
				},*/

		/*onPressCon: function (oEvent) {
			var Revenue = oEvent.getSource().getBindingContext("oModelShipToCon").getObject();

					this.getRouter().navTo("View2", {
						
						Type: Revenue.Type

					});
			},*/
		fnCompanySearchHelp: function (oEvent) {

			var oModelCompany = this.getOwnerComponent().getModel("CompanyCodeSet");
			this.getView().setModel(oModelCompany);

			var sInputValueCompany = oEvent.getSource().getValue();

			this.inputCompanyId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogCompany) {
				this._valueHelpDialogCompany = sap.ui.xmlfragment(
					"RevenueReport.ZREVENUE_REPORT.fragment.company", //id.fragments.file.name ---take id from manifest.json
					this
				);
				this.getView().addDependent(this._valueHelpDialogCompany);
			}

			// create a filter for the binding

			this._valueHelpDialogCompany.getBinding("items").filter([new sap.ui.model.Filter(
				"CompanyName",
				sap.ui.model.FilterOperator.Contains, sInputValueCompany
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialogCompany.open(sInputValueCompany);
		},
		fnSearchCompanyCode: function (evt) {
			var sValueCompany = evt.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"CompanyName",
				sap.ui.model.FilterOperator.Contains, sValueCompany
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		fnConfirmCompanyCode: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var CompanyInput = this.getView().byId(this.inputCompanyId);
				CompanyInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		},

		_handleValueCurrencyType: function (oEvent) {

			var oModelCurrencyTpe = this.getOwnerComponent().getModel("CurrencyDataSet");
			this.getView().setModel(oModelCurrencyTpe);

			var sInputValuecurrencytype = oEvent.getSource().getValue();

			this.inputCurrencyId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogCurrencyType) {
				this._valueHelpDialogCurrencyType = sap.ui.xmlfragment(
					"RevenueReport.ZREVENUE_REPORT.fragment.currency", //id.fragments.file.name ---take id from manifest.json
					this
				);
				this.getView().addDependent(this._valueHelpDialogCurrencyType);
			}

			// create a filter for the binding

			this._valueHelpDialogCurrencyType.getBinding("items").filter([new sap.ui.model.Filter(
				"currency",
				sap.ui.model.FilterOperator.Contains, sInputValuecurrencytype
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialogCurrencyType.open(sInputValuecurrencytype);
		},
		_handleValueHelpSearchcurrency: function (evt) {
			var sValueCurrencyType = evt.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"currency",
				sap.ui.model.FilterOperator.Contains, sValueCurrencyType
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},

		_handleValueHelpClosecurrency: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var CurrencyTypeInput = this.getView().byId(this.inputCurrencyId);
				CurrencyTypeInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		},

	});

});