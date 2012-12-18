(function () {
    "use strict";

    describe("Tab widget: ", function () {

        /* check if tab related roles are in the page */
        describe("tab related roles: ", function () {
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

        /* checks initial interaction stats on tab elements */
        describe("initial interaction state: ", function () {
            it("there should be one focusable tab role element when the page loads", function () {
                var tabElements = document.querySelectorAll("*[role='tablist'] *[role='tab']"),
                    focusable = [];

                for (var i = 0; i < tabElements.length; i++) {
                    if (tabElements[i].tabIndex >= 0) {
                        focusable.push(tabElements[i]);
                    }
                };

                expect(focusable.length).toBeGreaterThan(0);
            });

            it("there should be one tabpanel role element for each tab role elements", function () {
                var tabElements = document.querySelectorAll("*[role='tablist'] *[role='tab']"),
                    tabPanelElements = document.querySelectorAll("*[role='tabpanel']");

                expect(tabElements.length).toBe(tabPanelElements.length);
            });

            it("there should be only one interactive tab role element", function () {
                var tabElements = document.querySelectorAll("*[role='tablist'] *[role='tab']"),
                    focusable = [];

                for (var i = 0; i < tabElements.length; i++) {
                    if (tabElements[i].tabIndex >= 0) {
                        focusable.push(tabElements[i]);
                    }
                };

                expect(focusable.length).toBe(1);
            });
        });

        /* check the text labels for the tab elements */
        describe("text alternatives: ", function () {
            it("there should be descriptive text content for each tab role element", function () {
                var tabElements = document.querySelectorAll("*[role='tablist'] *[role='tab']");

                for (var i = 0; i < tabElements.length; i++) {
                    expect(tabElements[i].textContent).not.toBe("");
                    expect(tabElements[i].textContent.length).not.toBe(0);
                };
            });
        });

        /* check elements structure */
        describe("elements structure: ", function () {
            it("each tab role element should control one tabpanel role element, using aria-controls attribute", function () {
                var tabElements = document.querySelectorAll("*[role='tablist'] *[role='tab']"),
                    tabPanelElements = document.querySelectorAll("*[role='tabpanel']"),
                    foundElements = [];

                for (var i = 0; i < tabPanelElements.length; i++) {
                    for (var j = 0; j < tabElements.length; j++) {
                        var ariaControlsAttribute = tabElements[j].attributes.getNamedItem("aria-controls");
                        if (ariaControlsAttribute && tabPanelElements[i].id == ariaControlsAttribute.textContent) {
                            foundElements.push(tabPanelElements[i].id);
                            break;
                        }
                    };
                };

                expect(tabElements.length).toBe(tabPanelElements.length);
                expect(foundElements.length).toBe(tabElements.length);
            });
        });
    });
}());
