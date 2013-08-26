(function () {
    "use strict";

    var tabs = require("sdk/tabs"),
        self = require("sdk/self");

    exports.execute = function () {
        var worker = tabs.activeTab.attach({
            contentScriptFile: [ self.data.url("scripts_loader.js") ],
            contentScriptWhen: "end"
        });
        worker.port.emit("load_script", self.data.url("jasmine/js/jasmine.js"));
        worker.port.emit("load_script", self.data.url("jasmine/js/jasmine-html.js"));
        worker.port.emit("load_script", self.data.url("jasmine-jsreporter/jasmine-jsreporter.js"));
        worker.port.emit("load_script", self.data.url("tests/tabpanel_cases.js"));
        worker.port.emit("load_script", self.data.url("jasmine/js/jasmine-activation.js"));
        worker.port.emit("load_style", self.data.url("jasmine/css/jasmine.css"));
        return worker;
    };
}());
