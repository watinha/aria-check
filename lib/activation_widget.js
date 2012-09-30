(function () {
    "use strict";

    var self = require("self"),
        widget_instance = null,
        constants = {
            widget_id: "aria-check-widget",
            widget_label: "aria-check",
            content_url: "widget_panel.html"
        };

    // dependency insertion in order to test all params
    exports.create_instance = function (widget) {
        if (widget_instance === null) {
            widget_instance = widget.Widget({
                id: constants.widget_id,
                label: constants.widget_label,
                contentURL: self.data.url(constants.content_url),
                width: 120
            });
        }
        return widget_instance;
    };
}());
