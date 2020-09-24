/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"RevenueReport/ZREVENUE_REPORT/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});