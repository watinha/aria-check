(function () {
    "use strict";

    exports["test jasmine report transport from contentScript to chrome"] = function (assert) {
        var tabs = require("tabs"),
            self = require("self"),
            aria_check_runner = require("aria_check_runner");

        assert.waitUntilDone(3000, "as jasmine is ready, the report should be communicated to chrome");

        tabs.open({
            url: self.data.url("fixtures/tabpanel/tabpanel_dummy.html"),
            onReady: function () {
                var worker = aria_check_runner.execute();
                worker.port.on("jasmine_report", function (data) {
                    assert.pass();
                    assert.done();
                });
            }
        });
    };
}());
