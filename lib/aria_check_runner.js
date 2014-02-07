(function () {
    "use strict";

    var tabs = require("sdk/tabs"),
        self = require("sdk/self"),
        timers = require("sdk/timers");

    exports.execute = function () {
        var worker = tabs.activeTab.attach({
            contentScriptFile: [
                self.data.url("scripts_loader.js"),
                self.data.url("results_reporter.js")
            ],
            contentScriptWhen: "end"
        });
        worker.port.emit("load_script", self.data.url("jasmine/js/jasmine.js"));
        timers.setTimeout(function () {
            worker.port.emit("load_script", self.data.url("jasmine/js/jasmine-html.js"));
            worker.port.emit("load_script", self.data.url("jasmine-jsreporter/jasmine-jsreporter.js"));
            worker.port.emit("load_script", self.data.url("tests/tabpanel_cases.js"));
            worker.port.emit("load_style", self.data.url("jasmine/css/jasmine.css"));

            // time relaxation given this scripts require all others are loaded
            timers.setTimeout(function () {
                worker.port.emit("load_script", self.data.url("jasmine/js/jasmine-activation.js"));
            }, 300);
        }, 200);


        return worker;
    };
}());
