(function () {
    "use strict";

    exports.create_app = function () {
        var widget = require("widget"),
            panel = require("panel"),
            activation_widget = require("activation_widget"),
            aria_check_runner = require("aria_check_runner");

        return {
            init: function () {
                this.panel = panel.Panel({
                    width: 400,
                    height: 400
                });

                // dependency injection (WIDGET, PANEL)
                this.widget = activation_widget.create_instance(
                    widget, this.panel, aria_check_runner.execute);
            },
            run_aria_check: aria_check_runner.execute
        };
    };
}());
