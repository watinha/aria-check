(function () {
    "use strict";

    var tabs = require("tabs"),
        self = require("self");

    exports.execute = function () {
        tabs.activeTab.attach({
            contentScriptFile: [
                self.data.url("fixtures/js/jasmine.js"),
                self.data.url("fixtures/js/jasmine-html.js"),
                self.data.url("fixtures/js/jasmine-activation.js")
            ],
            contentScriptWhen: "end"
        });
    };
}());
