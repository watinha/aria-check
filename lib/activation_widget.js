(function () {
    "use strict";

    var self = require("self"),
        widget_instance = null, // singleton reference
        constants = {
            WIDGET_ID: "aria-check-widget",
            WIDGET_LABEL: "aria-check",
            CONTENT_URL: "widget_panel.html"
        };

    // dependency insertion in order to test all params
    exports.create_instance = function (widget, callback) {
        if (widget_instance === null) {
            widget_instance = widget.Widget({
                id: constants.WIDGET_ID,
                label: constants.WIDGET_LABEL,
                contentURL: self.data.url(constants.CONTENT_URL),
                width: 120,
                onClick: callback,
            });
        }
        return widget_instance;
    };

    // just for test purposes
    exports.clear_instance = function () {
        widget_instance = null;
    };
}());
