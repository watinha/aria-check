(function () {
    "use strict";

    var self = require("self"),
        widget_instance = null, // singleton reference
        constants = {
            widget_id: "aria-check-widget",
            widget_label: "aria-check",
            content_url: "widget_panel.html"
        };

    // dependency insertion in order to test all params
    exports.create_instance = function (widget, callback) {
        if (widget_instance === null) {
            widget_instance = widget.Widget({
                id: constants.widget_id,
                label: constants.widget_label,
                contentURL: self.data.url(constants.content_url),
                width: 120,
                onClick: callback
            });
        }
        return widget_instance;
    };

    // just for test purposes
    exports.clear_instance = function () {
        widget_instance = null;
    };
}());
