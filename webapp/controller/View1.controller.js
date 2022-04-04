sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ndc/BarcodeScanner",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, BarcodeScanner, Filter, FilterOperator, MessageToast, MessageBox) {
        "use strict";

		var oScanResultText;
        var objBarcodePicker;

        return Controller.extend("scannerbasicapp.controller.View1", {
            onInit: function () {
				oScanResultText = this.getView().byId('sampleBarcodeScannerResult');
			},

            onStopScan: function(oEvent) {

                if(objBarcodePicker != null) {
                    objBarcodePicker.destroy(true);
                } else {
                    // Scanner hasn't initiated yet.
                    MessageBox.alert(`Scanner hasn't initiated yet`);
                }
            },

            onBarcodeScan: function(oEvent) {
                
                ScanditSDK.configure("AT7xUjXcFMGEA8TRjjw8LJ057dQ1G0VzIUhcWuAvYdwna2En2mvKIQ8RgaaQRk4YVTRaNTJzORjMdarRZS/Hsmp7+mmESmPteyX/IJ8GKOmibfOOhkeC38syZVVKSz7dk3wluVwCr6QkTMgKKCg1ZAVrRH4Zd9GIlmuRaBMwc9bfW85rEFsJXiwsQ1BgbGf49VGsUiRVn0NKMdopfk1bzCpxSBeMXpTHlDKAi+pX0X/5NNQw4FUuTAZpFew9IcCbN0/+qNY0jkaFRG8P5mKdyadCRUZaTaMVPWqOrXoQ2hOHJKf0cwWiIzJDIpW7cy+VSiiledFY5oBniY0MLwAdl1Uu6Wzce3VdpVXxucOJOgZi0H0jP0cmL+nEDDcl02PS1yyNH6cwlHLI9ZbhkQDd7fT4/en5lKy/2mR2GVkCyXqwXM9cKbxJYd3W4TcbFRYoiGXO9YjScwt/Yx+Vgf/iSJbYLhQ0fd7KjdTZS5VyoNC9uUFcLUm5e5UNHipk9TEqfdYQZunZrDBl50JSuGy+/NRGK5BMBM9/NAzB1ZeH9v5u1LV3scER7eORFwCxwD8y2tZwqZ4iEPt9Fqfw1gYae+mBb3fnAdbodThbwDkPl9s1iYW9fSgvGqayYZoegBukLrVAwBZ+qVy9haGyrWfsjPNd8IcuUy0JzRRkPbGs8dp0rBBeCqNXjctAuyfVJFIebSsFp6OVyrFpZaZ67QQVlNKgEZdYai4Tl3qTTfbCTSdmIRlmv+fdwprJ5UegkbFRofc3+ELu7L/7kZ2vzMc0aFjttHhWT33Hzjh95pyevEhn7+/X1LqGgkvwqzQCLZuDK7to113NH5OC4b7fA+oumMOTN4O6ncrqhgwjnGYzkfO3I6xDte3VAmrUOmS//ToWNZG1JwCK20H3s/yVDB+m8nwK4KdYfKCTz/g15PPQ+gvljqfbpGtLpFHVozSYt0DJpypLNLLl+K5i9Ttjl8IfK1yxeZ42EPn0Db19ugaLBKz1xcgiBkN3wr0=", 
                {
                    engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/",
                })
                .then(() => {
                    return ScanditSDK.BarcodePicker.create(document.getElementById(this.getView().createId("scandit-barcode-picker")), {
                        // enable some common symbologies
                        scanSettings: new ScanditSDK.ScanSettings({ enabledSymbologies: ["ean8", "ean13", "upca", "upce", "code128", "code39", "itf", "qr", "data-matrix"] }),
                    });
                })
                .then((barcodePicker) => {

                    objBarcodePicker= barcodePicker;

                    barcodePicker.on("ready", () => {
                        console.log("Scanner is ready to scan");
                    });
                    
                    barcodePicker.on("scanError", (err) => {
                        console.log("Error found while scanning");
                        console.log(err);
                    });

                    // console.log(barcodePicker.isScanningPaused());

                    // if(barcodePicker.isScanningPaused() == true) {
                    //     console.log("if called");
                    //     barcodePicker.resumeScanning(true);
                    // }

                    // barcodePicker is ready here, show a message every time a barcode is scanned
                    barcodePicker.on("scan", (scanResult) => {

                        oScanResultText.setText(scanResult.barcodes[0].data);

                        // Destroy scanner as soon as we scanned some valid barcode.
                        barcodePicker.destroy(true);
                    });
                });
            },
    
        });
    });
