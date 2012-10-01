(function () {
    "use strict";

    exports["test create instance should consider onclick callback passed as parameter"] = function (assert) {
        var activation_widget = require("activation_widget"),
            widget_instance,
            widget_mock = {
                Widget: function (params) {
                    return params;
                }
            },
            callbackCalled = false,
            callbackHandler = {
                callback: function () {
                    callbackCalled = true;
                    // assert that the context of the callback is the same as passed
                    assert.assertEqual(callbackHandler, this);
                }
            };

        activation_widget.clear_instance(); // test method for clearing singleton instance
        widget_instance = activation_widget.create_instance(widget_mock, function () {
            callbackHandler.callback();
        });
        widget_instance.onClick.call({});
        assert.assert(callbackCalled);
    };

}());
