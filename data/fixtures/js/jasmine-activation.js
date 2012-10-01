(function() {
    "use strict";

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
                    });
                    document.body.appendChild(overlay);
                }
                reporter.style.cssText = "position:fixed;top:5%;left:5%;padding:5% 5%;height:80%;width:80%;z-index:1;background-color:#EEEEEE;overflow-y:scroll";
            }());
        });
    }());
})();

