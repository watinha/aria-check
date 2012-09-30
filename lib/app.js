(function () {
    'use strict';

    var widgetInstance = null;

    exports.createApp = function () {
        var self = require("self"),
            widget = require("widget"),
            constants = {
                widget_id: "aria-check-widget",
                widget_label: "aria-check",
                content_url: "widget_panel.html"
            };

        return {
            init: function () {
                if (widgetInstance === null) {
                    widgetInstance = widget.Widget({
                        id: constants.widget_id,
                        label: constants.widget_label,
                        contentURL: self.data.url(constants.content_url),
                        width: 120
                    });
                }
                this.widget = widgetInstance;
            }
        };
    };
}());
