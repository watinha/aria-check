(function () {
    "use strict";

    var tabs = require("tabs"),
        self = require("self");

    exports.execute = function () {
        var worker = tabs.activeTab.attach({
            contentScriptFile: [
                self.data.url("fixtures/js/jasmine.js"),
                self.data.url("fixtures/js/jasmine-html.js"),
                self.data.url("fixtures/js/jasmine-activation.js")
            ],
            contentScriptWhen: "end"
        });
        worker.port.emit("jasmineCSSURL", self.data.url("fixtures/css/jasmine.css"));
    };
}());
