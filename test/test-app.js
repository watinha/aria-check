(function () {
    'use strict';

    exports["test init should be a singleton for widgets objects"] = function (assert) {
        var app1 = require("app").create_app(),
            app2 = require("app").create_app();

        app1.init();
        app2.init();

        assert.assertEqual(app1.widget, app2.widget);
    };

    exports["test init should instantiate a widget object with the correct parameters"] = function (assert) {
        var app = require("app").create_app();
        app.init();
        assert.assertNotUndefined(app.widget, "widget object should be set");
        assert.assertEqual("aria-check-widget", app.widget.id);
        assert.assertEqual("aria-check", app.widget.label);
        assert.assertEqual(120, app.widget.width);
    };

    exports["test init should include jasmine in pages"] = function (assert) {
        var tabs = require("tabs"),
            self = require("self"),
            app = require("app").create_app();
        app.init();
        assert.waitUntilDone(30000);
        tabs.open({
            url: self.data.url("fixtures/tabpanel_perfect.html"),
            onReady: function (tab) {
                var worker;

                app.run_aria_check();

                worker = tab.attach({
                    contentScript: "function waitForReporter () {" +
                                   "    var reporter = document.querySelector(\"#HTMLReporter\");" +
                                   "    if (reporter) {" +
                                   "        self.port.emit(\"supimpa\", reporter.innerHTML);" +
                                   "        return ;" +
                                   "    } else {" +
                                   "        setTimeout(waitForReporter, 1000);" +
                                   "    }" +
                                   "}" +
                                   "setTimeout(waitForReporter, 1000);",
                    contentScriptWhen: "ready"
                });
                worker.port.on("supimpa", function (data) {
                    assert.pass("");
                    assert.done();
                });
            }
        });
    };

}());
