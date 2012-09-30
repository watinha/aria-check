(function () {
    'use strict';

    var widget_instance = null;

    exports.create_app = function () {
        var self = require("self"),
            widget = require("widget"),
            constants = {
                widget_id: "aria-check-widget",
                widget_label: "aria-check",
                content_url: "widget_panel.html"
            },
            methods = {
                create_widget_instance: null,
                include_jasmine: null
            };

        methods.create_widget_instance = function () {
            if (widget_instance === null) {
                widget_instance = widget.Widget({
                    id: constants.widget_id,
                    label: constants.widget_label,
                    contentURL: self.data.url(constants.content_url),
                    width: 120
                });
            }
            this.widget = widget_instance;
        };

        return {
            init: methods.create_widget_instance
        };
    };
}());
