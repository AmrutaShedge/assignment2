sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,DateFormat,Dialog,Text,Button) {
        "use strict";
        var userData = {
            "results": [                      //Absolute path and Aggregation Binding
                {
                    "username": "AmrutaShedge",              //Relative path and Element Binding
                     "date" : "12 Apr 2023",
                     "text" : "Good Morning"
                }
            ]
        }

        return Controller.extend("assignment2.controller.View1", {
            onInit: function () {
                var oModel = new JSONModel();
                oModel.setData(userData);
			this.getView().setModel(oModel);

            },
            onPost: function (oEvent) {
                var oFormat = DateFormat.getDateTimeInstance({ style: "medium" });
                var oDate = new Date();
                var sDate = oFormat.format(oDate);
                // create new entry

                var sValue = oEvent.getParameter("value");
                // var oFilterusername = new Filter(sValue,sap.ui.model.FilterOperator.EndsWith, "-"), 
                // oFiltertext = new sap.ui.model.Filter(sValue,sap.ui.model.FilterOperator.StartsWith, "-");
                var oEntry = {
                    username: "AmrutaShedge",
                    date: "" + sDate,
                    text:sValue
                };

                // update model
                var oModel = this.getView().getModel();
                var aEntries = oModel.getData().results;
                aEntries.push(oEntry);
                oModel.setData({
                    results: aEntries
                });
            },
            onLineItemPress:function(oEvent){
                var bindedPath = oEvent.getSource().getBindingContext().getPath();
                var data = this.getView().getModel().getObject(bindedPath);
                if (!this.oDialog) {
                    this.oDialog = new Dialog({
                        id: "idDialog",
                        title: "Display User Details",
                        content: new Text({
                            text: "Name : {username} "+"\n"+"Message : {text}"+"\n"+"Date : {date}",
                            
                        }),
                        endButton: new Button({
                            text: "Cancel",
                            press:function(){
                                this.oDialog.close();
                            }.bind(this)
                        })
                    });
                }
                this.oDialog.setBindingContext(oEvent.getSource().getBindingContext());
                this.getView().addDependent(this.oDialog);
                this.oDialog.open();
            }
        });
    });
