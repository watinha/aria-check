(function () {
    'use strict';

    exports["test init should be a singleton for widgets objects"] = function (assert) {
        var app1 = require("app").createApp(),
            app2 = require("app").createApp();

        app1.init();
        app2.init();

        assert.assertEqual(app1.widget, app2.widget);
    };

    exports["test init should instantiate a widget object with the correct parameters"] = function (assert) {
        var app = require("app").createApp();
        app.init();
        assert.assertNotUndefined(app.widget, "widget object should be set");
        assert.assertEqual("aria-check-widget", app.widget.id);
        assert.assertEqual("aria-check", app.widget.label);
        assert.assertEqual(120, app.widget.width);
    };

}());
