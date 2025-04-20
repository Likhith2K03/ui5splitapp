sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (BaseController, JSONModel, Fragment, Filter, FilterOperator) => {
    "use strict";

    return BaseController.extend("app.splitapp.controller.DetailView", {
        onInit() {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },

        onListView() {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteMasterView");
        },

        onRouteMatched(oEvent) {
            let index = oEvent.getParameter("arguments").index;
            let sPath = "ToolsModel>/" + index;
            let oView = this.getView();
            oView.bindElement(sPath);

            // Code to get specific supplier
            // let oModel = this.getModel("ToolsModel");
            // let sSearch = oModel.getProperty(`/${index}/toolName`);
            // let filterName = new sap.ui.model.Filter("toolsName",
            //     sap.ui.model.FilterOperator.EQ,
            //     sSearch
            // );
            // let oTable = this.getView().byId("idMTable");
            // let oBindingInfo = oTable.getBinding("items");
            // oBindingInfo.filter([filterName]);
        },

        onFilter() {
            let aFilter = [];
            let sName = this.getView().byId("idNameSupplier").getValue();
            let sCity = this.getView().byId("idInputCity").getValue();
            if(sName) {
                let filterName = new Filter("supplierName", FilterOperator.Contains, sName)
                aFilter.push(filterName);
            }
            if(sCity) {
                let filterName = new Filter("location", FilterOperator.Contains, sCity)
                aFilter.push(filterName);
            }

            let oTable = this.getView().byId("idMTable");
            let oBindingItems = oTable.getBinding("items");
            oBindingItems.filter(aFilter);
        },

        onConfirm(oEvent) {
            let oSelectedItem = oEvent.getParameter("selectedItem");
            let sValue = oSelectedItem.getProperty("title");
            let oInput = sap.ui.getCore().byId(this.idInputField);
            oInput.setValue(sValue);
            // confirm the choice
            // we need the value that is selected
            // we need to place it exactly at the same input field where the value is selected.
            // you are setting the value on that input field
        },

        onF4Help(oEvent) {
            this.idInputField = oEvent.getSource().getId();
            let oModel = this.getView().getModel("SupplierModel");
            let aData = oModel.getProperty("/");
            let deepCopy = JSON.parse(JSON.stringify(aData));
            let oModelFragment = new JSONModel({newSuppSet: deepCopy})
            if(!this.oDialog) {
                this.oDialog = Fragment.load({
                    fragmentName: "app.splitapp.fragments.popUp",
                    controller: this
                }).then((fDialog) => {
                    this.oDialog = fDialog
                    this.getView().addDependent(this.oDialog);
                    this.getView().setModel(oModelFragment, "FragmentModel")
                    this.oDialog.open();
                })
            }
            else {
                this.oDialog.open();
            }
            
        }
    });
});


//arrow function
//this takes the value from the lexical context of the place it is
//easier syntax
//have you heard about es6
//it is a consortium that is responsible bringing newer ways of coding styles
//ex:template literals