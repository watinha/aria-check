(function () {
    'use strict';

    var widget_stub = {
        Widget: function () {
            return {
                id: "aria-check-widget",
                label: "aria-check",
                width: 120
            };
        }
    };

    exports["test init should be a singleton for widgets objects"] = function (assert) {
        var app1 = require("app").create_app(widget_stub),
            app2 = require("app").create_app(widget_stub);

        app1.init();
        app2.init();

        assert.equal(app1.widget, app2.widget);
    };

    exports["test init should instantiate a widget object with the correct parameters"] = function (assert) {
        var app = require("app").create_app(widget_stub);
        app.init();
        assert.ok(app.widget, "widget object should be set");
        assert.equal("aria-check-widget", app.widget.id);
        assert.equal("aria-check", app.widget.label);
        assert.equal(120, app.widget.width);
    };

    exports["test init should include jasmine in pages"] = function (assert, done) {
        var tabs = require("sdk/tabs"),
            self = require("sdk/self"),
            app = require("app").create_app(widget_stub);
        app.init();
        tabs.open({
            url: self.data.url("fixtures/tabpanel/tabpanel_dummy.html"),
            onReady: function (tab) {
                /**
                  * tricky part to extract data from the HTML of a Single
                  * web page using tab.attach content script to get this
                  * information
                  */
                var worker;

                app.run_aria_check();

                worker = tab.attach({
                    contentScript: "function waitForReporter () {" +
                                   "    var reporter = document.querySelector(\"#HTMLReporter\");" +
                                   "    if (reporter) {" +
                                   "        self.port.emit(\"check_reporter\", document.body.innerHTML);" +
                                   "        return ;" +
                                   "    } else {" +
                                   "        setTimeout(waitForReporter, 1000);" +
                                   "    }" +
                                   "}" +
                                   "setTimeout(waitForReporter, 1000);",
                    contentScriptWhen: "ready"
                });
                worker.port.on("check_reporter", function (data) {
                    assert.ok(data.search("id=\"HTMLReporter\"") >= 0, "HTMLReporter element should be in the page"); // has reporter?
                    assert.ok(data.search("jasmine.css") >= 0, "jasmine.css should be in the page"); // has jasmine css
                    done();
                });
            }
        });
    };

    exports["test should not include two jasmine reporters in the same page"] = function (assert, done) {
        var tabs = require("sdk/tabs"),
            self = require("sdk/self"),
            app = require("app").create_app(widget_stub);
        app.init();
        //assert.waitUntilDone(30000);
        tabs.open({
            url: self.data.url("fixtures/tabpanel/tabpanel_dummy.html"),
            onReady: function (tab) {
                /**
                  * tricky part to extract data from the HTML of a Single
                  * web page using tab.attach content script to get this
                  * information
                  */
                var worker;

                app.run_aria_check();
                app.run_aria_check();

                worker = tab.attach({
                    contentScript: "function waitForReporter () {" +
                                   "    var reporter = document.querySelectorAll(\".jasmine_reporter\");" +
                                   "    if (reporter) {" +
                                   "        self.port.emit(\"check_reporter\", reporter.length);" +
                                   "        return ;" +
                                   "    } else {" +
                                   "        setTimeout(waitForReporter, 1000);" +
                                   "    }" +
                                   "}" +
                                   "setTimeout(waitForReporter, 1000);",
                    contentScriptWhen: "ready"
                });
                worker.port.on("check_reporter", function (data) {
                    assert.equal(1, data, "should not have 2 reporters");
                    done();
                });
            }
        });
    };

    require("sdk/test").run(exports);
}());
