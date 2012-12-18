(function () {
    "use strict";
    var TestHelpers = {
        check_report: function (assert, done, fixture, report_handler) {
            var tabs = require("tabs"),
                self = require("self"),
                aria_check_runner = require("aria_check_runner");

            tabs.open({
                url: self.data.url(fixture),
                onReady: function () {
                    var worker = aria_check_runner.execute();
                    worker.port.on("jasmine_report", report_handler);
                }
            });
        }
    };

    exports["test jasmine report transport from contentScript to chrome"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy.html", function (data) {
            assert.ok("worker should have a data reporter");
            done();
        });
    };

    exports["test should be reported that there is no tab widget in tabpanel_dummy"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy.html", function (data) {
            assert.ok(!data.passed, "the test should fail since there are no tab widgets in the webpage");
            done();
        });
    };

    exports["test should be reported that there is no tablist role in tabpanel_dummy1"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy1.html", function (data) {
            assert.ok(!data.passed, "the test should fail since there are no tablist role in the webpage");
            done();
        });
    };

    require("test").run(exports);
}());
