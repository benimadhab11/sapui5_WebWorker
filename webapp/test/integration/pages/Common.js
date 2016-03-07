sap.ui.define([
	"sap/ui/test/Opa5"
], function(Opa5) {
	"use strict";

	function getFrameUrl(sHash, sUrlParameters) {
		var sUrl = jQuery.sap.getResourcePath("plaut/app", ".html");
		sUrlParameters = sUrlParameters ? "?" + sUrlParameters : "";

		if (sHash) {
			sHash = "#test-display&/" + (sHash.indexOf("/") === 0 ? sHash.substring(1) : sHash);
		} else {
			sHash = "#test-display";
		}

		return sUrl + sUrlParameters + sHash;
	}

	return Opa5.extend("plaut.test.integration.pages.Common", {

		iStartMyApp: function(oOptions) {
			var sUrlParameters = "";
			oOptions = oOptions || {};

			if (oOptions.delay) {
				sUrlParameters = "serverDelay=" + oOptions.delay;
			}

			this.iStartMyAppInAFrame(getFrameUrl(oOptions.hash, sUrlParameters));
		},

		iLookAtTheScreen: function() {
			return this;
		},

		iStartMyAppOnADesktopToTestErrorHandler: function(sParam) {
			this.iStartMyAppInAFrame(getFrameUrl("", sParam));
		},

		theUnitNumbersShouldHaveTwoDecimals: function(sControlType, sViewName, sSuccessMsg, sErrMsg) {
			var rTwoDecimalPlaces = /^-?\d+\.\d{2}$/;

			return this.waitFor({
				controlType: sControlType,
				viewName: sViewName,
				success: function(aNumberControls) {
					QUnit.ok(aNumberControls.every(function(oNumberControl) {
							return rTwoDecimalPlaces.test(oNumberControl.getNumber());
						}),
						sSuccessMsg);
				},
				errorMessage: sErrMsg
			});
		}

	});

});