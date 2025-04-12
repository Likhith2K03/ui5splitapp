sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("app.splitapp.controller.DetailView", {
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
        }
    });
});