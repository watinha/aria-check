(function () {
    "use strict";

    exports.create_app = function (widgetInstance) {
        var widget = widgetInstance || require("sdk/widget"),
            self = require("sdk/self"),
            activation_widget = require("activation_widget"),
            aria_check_runner = require("aria_check_runner");

        return {
            init: function () {
                // dependency injection (WIDGET)
                this.widget = activation_widget.create_instance(
                    widget,
                    aria_check_runner.execute
                );
            },
            run_aria_check: aria_check_runner.execute
        };
    };
}());
