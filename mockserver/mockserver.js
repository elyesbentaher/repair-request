sap.ui.define(["sap/ui/core/util/MockServer", "sap/base/util/UriParameters"], function (MockServer, UriParameters) {
  "use strict";

  return {
    init: function () {
      // create
      var oMockServer = new MockServer({
        rootUri: "/",
      });

      var oUriParameters = UriParameters.fromQuery(window.location.search);

      // configure mock server with a delay
      MockServer.config({
        autoRespond: true,
        autoRespondAfter: oUriParameters.get("serverDelay") || 100,
      });

      // simulate
      var sPath = sap.ui.require.toUrl("AssetPM/localService");
      oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

      // start
      oMockServer.start();
    },
  };
});
