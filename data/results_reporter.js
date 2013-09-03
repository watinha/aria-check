/**
  * sends a json reporter back to chrome privileged scripts
  */
(function () {
    var jsReport,
        verifyReporter = function () {
            var report = window.document.querySelector("#json_report");
            if (report)
                self.port.emit("jasmine_report", {
                    passed: (report.innerHTML === "true")
                });
            else
                setTimeout(verifyReporter, 200);
        };
    verifyReporter();
})();
