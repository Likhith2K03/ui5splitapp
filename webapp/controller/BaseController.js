sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], (BaseController) => {
    "use strict";
  
    return BaseController.extend("app.splitapp.controller.BaseController", {
        onInit() {
        },
        getModel(oModel) {
            return this.getOwnerComponent().getModel(oModel);
          }
    });
  });