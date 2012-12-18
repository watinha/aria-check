(function () {
    "use strict";

    describe("tab behavior", function () {

        /* check if tab related roles are in the page */
        it("should have a tab role in the page", function () {
            var tabElements = document.querySelectorAll("*[role='tab']");
            expect(tabElements).toBeGreaterThan(0);
        });

    });
}());
