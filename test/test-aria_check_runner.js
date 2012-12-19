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

    exports["test 01 jasmine report transport from contentScript to chrome"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy.html", function (data) {
            assert.ok("worker should have a data reporter");
            done();
        });
    };

    exports["test 02 should be reported that there is no tab widget in tabpanel_dummy"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy.html", function (data) {
            assert.ok(!data.passed, "the test should fail since there is no tab widget in the webpage");
            done();
        });
    };

    exports["test 03 should be reported that there is no tablist role in tabpanel_dummy1"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy1.html", function (data) {
            assert.ok(!data.passed, "the test should fail since there is no tablist role in the webpage");
            done();
        });
    };

    exports["test 04 should be reported that there is no tabpanel role in tabpanel_dummy2"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy2.html", function (data) {
            assert.ok(!data.passed, "the test should fail since there is no tabpanel role in the webpage");
            done();
        });
    };

    exports["test 05 should be reported that tab role has tabindex >= 0 in tabpanel_dummy3"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy3.html", function (data) {
            assert.ok(!data.passed, "the test should fail since tab inside tablist does not have tabindex >= 0");
            done();
        });
    };

    exports["test 06 should be reported that there should be one tabpanel for each tab in tabpanel_dummy4"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy4.html", function (data) {
            assert.ok(!data.passed, "the test should fail since there are not enough tabpanels for each tab");
            done();
        });
    };

    exports["test 07 should be reported that there should be only one interactive tab role element in tabpanel_dummy5"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy5.html", function (data) {
            assert.ok(!data.passed, "the test should fail since there is more than 1 interactive tab role element");
            done();
        });
    };

    exports["test 08 should be reported that there should be descriptive text content inside the tab elements in tabpanel_dummy6"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy6.html", function (data) {
            assert.ok(!data.passed, "the test should fail since there is no descriptive content for the tab labels");
            done();
        });
    };

    exports["test 09 should be reported that each tab should match one single tabpanel in tabpanel_dummy7"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy7.html", function (data) {
            assert.ok(!data.passed, "the test should fail since not all tab role");
            done();
        });
    };

    exports["test 10 should be reported that each tabpanel should have one label in tabpanel_dummy8"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy8.html", function (data) {
            assert.ok(!data.passed, "the test should fail since there are no labels for the tabpanel");
            done();
        });
    };

    exports["test 11 should be reported that only one tabpanel is visible in tabpanel_dummy9"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy9.html", function (data) {
            assert.ok(!data.passed, "the test should fail since all tabpanels are visible, when only one should be");
            done();
        });
    };

    /* testing the behavior of the tab widget */
    exports["test 12 should be reported that dispatching keyboard events in the active tab role elements should move focus in tabpanel_dummy10"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy10.html", function (data) {
            assert.ok(!data.passed, "the test should fail since down arrow keyboard event does not change the focus of the current tab role element");
            done();
        });
    };

    exports["test 13 should be reported that dispatching keyboard events in the active tab role elements should move focus in tabpanel_dummy11"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy11.html", function (data) {
            assert.ok(!data.passed, "the test should fail since right arrow keyboard event does not change the focus of the current tab role element");
            done();
        });
    };

    exports["test 14 should be reported that dispatching keyboard events in the active tab role elements should move focus in tabpanel_dummy12"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy12.html", function (data) {
            assert.ok(!data.passed, "the test should fail since up arrow keyboard event does not change the focus of the current tab role element");
            done();
        });
    };

    exports["test 15 should be reported that dispatching keyboard events in the active tab role elements should move focus in tabpanel_dummy13"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy13.html", function (data) {
            assert.ok(!data.passed, "the test should fail since left arrow keyboard event does not change the focus of the current tab role element");
            done();
        });
    };

    exports["test 16 should change visibility of associated tabpanel with keydown arrow key event tabpanel_dummy14"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy14.html", function (data) {
            assert.ok(!data.passed, "the visibility of the tabpanel should be changed as the down key arrow is pressed");
            done();
        });
    };

    exports["test 17 should change visibility of associated tabpanel with keydown arrow key event tabpanel_dummy15"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy15.html", function (data) {
            assert.ok(!data.passed, "the visibility of the tabpanel should be changed as the right key arrow is pressed");
            done();
        });
    };

    exports["test 18 should change visibility of associated tabpanel with keydown arrow key event tabpanel_dummy16"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy16.html", function (data) {
            assert.ok(!data.passed, "the visibility of the tabpanel should be changed as the up key arrow is pressed");
            done();
        });
    };

    exports["test 19 should change visibility of associated tabpanel with keydown arrow key event tabpanel_dummy17"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_dummy17.html", function (data) {
            assert.ok(!data.passed, "the visibility of the tabpanel should be changed as the left key arrow is pressed");
            done();
        });
    };

    exports["test 99 perfect implementation for tab widget should be acknowledged in tabpanel_perfect"] = function (assert, done) {
        TestHelpers.check_report(assert, done, "fixtures/tabpanel/tabpanel_perfect.html", function (data) {
            assert.ok(data.passed, "the test should succeed in recognizing a perfect tab widget implementation");
            done();
        });
    };

    require("test").run(exports);
}());
