(function() {
    "use strict";

    if (document.querySelector(".jasmine_reporter"))
        return ;

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
        jasmineEnv.execute();

        /**
          * pooling reports from jasmine
          */
        (function () {
            var jsReport,
                verifyReporter = function () {
                    if (jasmine && jasmine.getJSReport) {
                        var div_report = document.createElement("div");
                        div_report.style.display = "none";
                        div_report.id = "json_report";
                        div_report.innerHTML = jasmine.getJSReport().passed;
                        document.body.appendChild(div_report);
                    } else
                        setTimeout(verifyReporter, 200);
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
            reporter.style.cssText = "position:fixed;top:5%;left:5%;padding:5% 5%;height:70%;width:80%;z-index:1;background-color:#EEEEEE;overflow-y:scroll";
        }());
    }());
})();
