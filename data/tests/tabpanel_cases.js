(function () {
    "use strict";

    describe("Tab widget: ", function () {

        /* check if tab related roles are in the page */
        it("the webpage should have a tab role in the page", function () {
            var tabElements = document.querySelectorAll("*[role='tab']");
            expect(tabElements.length).toBeGreaterThan(0);
        });

        it("the webpage should have a tablist role element that contains the tab role element", function () {
            var tabElements = document.querySelectorAll("*[role='tablist'] *[role='tab']");
            expect(tabElements.length).toBeGreaterThan(0);
        });

        it("the webpage should have a tabpanel role element in the page", function () {
            var tabElements = document.querySelectorAll("*[role='tabpanel']");
            expect(tabElements.length).toBeGreaterThan(0);
        });

    });
}());
