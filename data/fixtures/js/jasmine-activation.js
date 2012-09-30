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
        jasmineEnv.execute();
        document.querySelector("#HTMLReporter").style.display = "none";
    }());
})();

