(function () {
    'use strict';

    exports.create_app = function () {
        var widget = require("widget"),
            activation_widget = require("activation_widget"),
            methods = {
                include_jasmine: null
            };

        return {
            init: function () {
                // dependency injection (WIDGET)
                this.widget = activation_widget.create_instance(widget);
            }
        };
    };
}());
