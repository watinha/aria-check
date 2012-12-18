(function() {
    "use strict";

    describe("Jasmine environment checking", function () {
        it("environment should be running OK, start testing", function () {
            expect(jasmine).toBeDefined();
        });
    });

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter(),
        jsReporter = new jasmine.JSReporter();

    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.addReporter(jsReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    (function () {
        self.port.on("jasmineCSSURL", function (data) {
            var reporter = document.querySelector("#HTMLReporter"),
                link = document.createElement("link");
            if (reporter) {
                reporter.parentNode.removeChild(reporter);
            } else {
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = data;
                document.body.appendChild(link);
            }
            jasmineEnv.execute();

            /**
              * sends a json reporter back to chrome privileged scripts
              */
            (function () {
                var jsReport,
                    verifyReporter = function () {
                        if (jasmine.getJSReport)
                            self.port.emit("jasmine_report", jasmine.getJSReport());
                        else
                            setTimeout(verifyReporter, 2000);
                    };
                verifyReporter();
            })();

            /**
              * set a cool layout for the reporter
              */
            (function () {
                var reporter = document.querySelector("#HTMLReporter"),
                    overlay = document.querySelector("#HTMLReporterOverlay");

                if (!overlay) {
                    overlay = document.createElement("div");
                    overlay.id = "HTMLReporterOverlay";
                    overlay.style.cssText = "background-color:black;opacity:0.8;position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;";
                    overlay.addEventListener("click", function () {
                        document.body.removeChild(overlay);
                        document.body.removeChild(reporter);
                        document.body.removeChild(link);
                    });
                    document.body.appendChild(overlay);
                }
                reporter.style.cssText = "position:fixed;top:5%;left:5%;padding:5% 5%;height:80%;width:80%;z-index:1;background-color:#EEEEEE;overflow-y:scroll";
            }());
        });
    }());
})();

