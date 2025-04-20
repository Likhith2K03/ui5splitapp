sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, Sorter, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("app.splitapp.controller.MasterView", {
        onInit() {},

        onDetailView() {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetailView");
        },

		onFormView() {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteFormView");
        },

        onSort() {
			let oList = this.getView().byId("idListCtrl");
			let oItemsBinding = oList.getBinding("items");
			let bSort = this.getView().byId("btnSort");
			// Check the current sorting order
		    if (!this.bDescending) {
		        // Set to descending sort order
		        this.bDescending = true;
		        bSort.setIcon("sap-icon://sort-descending"); // Set icon to descending
		    } else {
		        // Set to ascending sort order
		        this.bDescending = false;
		        bSort.setIcon("sap-icon://sort-ascending"); // Set icon to ascending
		    }
			let oSorter = new Sorter("toolName", this.bDescending);
			oItemsBinding.sort(oSorter);
		},

		onSearch(oEvent) {
			let sSearch = oEvent.getParameter("query") || oEvent.getParameter("newValue");
			let oName = new Filter("toolName", FilterOperator.Contains, sSearch);
			let oAvail = new Filter("availability", FilterOperator.Contains, sSearch);
			let aFilter = [oName, oAvail];
			let bAnd = false;
			let mainFilter = new Filter(aFilter, bAnd);
			let oList = this.getView().byId("idListCtrl");
			let oItemsBinding = oList.getBinding("items");
			oItemsBinding.filter(mainFilter);
		},
		
		onItemSelect(oEvent) {
			//When triggered directs to the DetailView
			let oList = oEvent.getParameter("listItem");
			let sPath = oList.getBindingContextPath();
			let aParts = sPath.split("/");
			let id = aParts[aParts.length - 1];
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetailView", {
                index: id
            })
		}
    });
});