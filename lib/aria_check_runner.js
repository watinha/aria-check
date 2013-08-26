(function () {
    "use strict";

    var tabs = require("sdk/tabs"),
        self = require("sdk/self");

    exports.execute = function () {
        var worker = tabs.activeTab.attach({
            contentScriptFile: [
                self.data.url("jasmine/js/jasmine.js"),
                self.data.url("jasmine/js/jasmine-html.js"),
                self.data.url("jasmine-jsreporter/jasmine-jsreporter.js"),
                self.data.url("tests/tabpanel_cases.js"),
                self.data.url("jasmine/js/jasmine-activation.js")
            ],
            contentScriptWhen: "end"
        });
        worker.port.emit("jasmineCSSURL", self.data.url("jasmine/css/jasmine.css"));
        return worker;
    };
}());
