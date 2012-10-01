(function() {
    "use strict";

    describe("Something cool", function() {
        it("should be OK", function() {
            expect(true).toBe(true);
        });
    });

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    (function () {
        self.port.on("jasmineCSSURL", function (data) {
            var reporter = document.querySelector("#HTMLReporter");
            if (reporter) {
                reporter.parentNode.removeChild(reporter);
            } else {
                var link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = data;
                document.body.appendChild(link);
            }
            jasmineEnv.execute();
        });
    }());
})();

