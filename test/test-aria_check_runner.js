(function () {
    "use strict";

    exports["test jasmine report transport from contentScript to chrome"] = function (assert, done) {
        var tabs = require("tabs"),
            self = require("self"),
            aria_check_runner = require("aria_check_runner");

        tabs.open({
            url: self.data.url("fixtures/tabpanel/tabpanel_dummy.html"),
            onReady: function () {
                var worker = aria_check_runner.execute();
                worker.port.on("jasmine_report", function (data) {
                    assert.ok("worker should have a data reporter");
                    done();
                });
            }
        });
    };

    require("test").run(exports);
}());
