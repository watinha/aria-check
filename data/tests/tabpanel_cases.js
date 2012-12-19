(function (describe, it, expect, document, window) {
    "use strict";
    var Helpers = {
        dispatchKeyEvent: function (target, keycode) {
            var keydownEvent = document.createEvent("KeyboardEvent"),
                keyupEvent = document.createEvent("KeyboardEvent"),
                keypressEvent = document.createEvent("KeyboardEvent");

            keydownEvent.initKeyEvent("keydown", true, true, window, false, false, false, false, keycode, keycode);
            keyupEvent.initKeyEvent("keyup", true, true, window, false, false, false, false, keycode, keycode);
            keypressEvent.initKeyEvent("keypress", true, true, window, false, false, false, false, keycode, keycode);

            target.dispatchEvent(keydownEvent);
            target.dispatchEvent(keyupEvent);
            target.dispatchEvent(keypressEvent);
        },
        verifyPanelVisibility: function (activeTab) {
            var activeTabControlAttribute,
                activeTabPanel,
                tabPanelHidden,
                tabPanelDisplay,
                tabPanelVisibility,
                panelInvisible,
                tabPanelElements = document.querySelectorAll("[role='tabpanel']"),
                i = 0;

            activeTabControlAttribute = activeTab.attributes.getNamedItem("aria-controls").textContent;
            activeTabPanel = document.getElementById(activeTabControlAttribute);

            for (i = 0; i < tabPanelElements.length; i = i + 1) {
                tabPanelHidden = tabPanelElements[i].attributes.getNamedItem("aria-hidden");
                tabPanelDisplay = window.getComputedStyle(tabPanelElements[i], null).getPropertyValue("display");
                tabPanelVisibility = window.getComputedStyle(tabPanelElements[i], null).getPropertyValue("visibility");

                panelInvisible = (tabPanelHidden && tabPanelHidden.textContent === "true") ||
                                 (tabPanelDisplay === "none") ||
                                 (tabPanelVisibility === "hidden");

                if (tabPanelElements[i] == activeTabPanel) {
                    expect(panelInvisible).toBe(false);
                } else {
                    expect(panelInvisible).toBe(true);
                }
            }
        },
        verifyFocusChange: function (document, keyCode, indexDelta) {
            var tabElements = document.querySelectorAll("*[role='tablist'] *[role='tab']"),
                tabPanelElements = document.querySelectorAll("*[role='tabpanel']"),
                beginningActiveTab,
                activeTab,
                activeTabIndex,
                i = 0,
                indexDelta = indexDelta || 1;

            for (i = 0; i < tabElements.length; i = i + 1) {
                if (tabElements[i].tabIndex >= 0) {
                    activeTab = tabElements[i];
                    activeTabIndex = i;
                    break;
                }
            }

            beginningActiveTab = activeTab;

            // set focus to the tab
            activeTab.focus();
            do {
                // dispatch a keyboard event to move the focus
                Helpers.dispatchKeyEvent(activeTab, keyCode);
                activeTabIndex = (activeTabIndex + indexDelta) < 0 ?
                    tabElements.length - 1 : ((activeTabIndex + indexDelta) % tabElements.length);
                activeTab = document.activeElement;
                expect(document.activeElement).toBe(tabElements[activeTabIndex]);
            } while (activeTab !== beginningActiveTab);
        }
    };

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

        /* check elements structure */
        describe("elements structure: ", function () {
            it("each tab role element should control one tabpanel role element, using aria-controls attribute", function () {
                var tabElements = document.querySelectorAll("*[role='tablist'] *[role='tab']"),
                    tabPanelElements = document.querySelectorAll("*[role='tabpanel']"),
                    ariaControlsAttribute,
                    foundElements = [],
                    i = 0,
                    j = 0;

                for (i = 0; i < tabPanelElements.length; i = i + 1) {
                    for (j = 0; j < tabElements.length; j = j + 1) {
                        ariaControlsAttribute = tabElements[j].attributes.getNamedItem("aria-controls");
                        if (ariaControlsAttribute && tabPanelElements[i].id === ariaControlsAttribute.textContent) {
                            foundElements.push(tabPanelElements[i].id);
                            break;
                        }
                    }
                }

                expect(tabElements.length).toBe(tabPanelElements.length);
                expect(foundElements.length).toBe(tabElements.length);
            });
        });

        /* checks initial interaction stats on tab elements */
        describe("initial interaction state: ", function () {
            it("there should be one focusable tab role element when the page loads", function () {
                var tabElements = document.querySelectorAll("*[role='tablist'] *[role='tab']"),
                    focusable = [],
                    i = 0;

                for (i = 0; i < tabElements.length; i = i + 1) {
                    if (tabElements[i].tabIndex >= 0) {
                        focusable.push(tabElements[i]);
                    }
                }

                expect(focusable.length).toBeGreaterThan(0);
            });

            it("there should be one tabpanel role element for each tab role elements", function () {
                var tabElements = document.querySelectorAll("*[role='tablist'] *[role='tab']"),
                    tabPanelElements = document.querySelectorAll("*[role='tabpanel']");

                expect(tabElements.length).toBe(tabPanelElements.length);
            });

            it("there should be only one interactive tab role element", function () {
                var tabElements = document.querySelectorAll("*[role='tablist'] *[role='tab']"),
                    focusable = [],
                    i = 0;

                for (i = 0; i < tabElements.length; i = i + 1) {
                    if (tabElements[i].tabIndex >= 0) {
                        focusable.push(tabElements[i]);
                    }
                }

                expect(focusable.length).toBe(1);
            });

            it("there should be only one visible tabpanel role element that is controled by the current active tab role element", function () {
                var tabElements = document.querySelectorAll("*[role='tablist'] *[role='tab']"),
                    activeTab,
                    i = 0;

                for (i = 0; i < tabElements.length; i = i + 1) {
                    if (tabElements[i].tabIndex >= 0) {
                        activeTab = tabElements[i];
                        break;
                    }
                }

                // check panel visibility
                Helpers.verifyPanelVisibility(activeTab);
            });
        });

        /* check the text labels for the tab elements */
        describe("text alternatives: ", function () {
            it("there should be descriptive text content for each tab role element", function () {
                var tabElements = document.querySelectorAll("*[role='tablist'] *[role='tab']"),
                    i = 0;

                for (i = 0; i < tabElements.length; i = i + 1) {
                    expect(tabElements[i].textContent).not.toBe("");
                    expect(tabElements[i].textContent.length).not.toBe(0);
                }
            });

            it("there should be descriptive text content for each tabpanel element", function () {
                var tabPanels = document.querySelectorAll("*[role='tabpanel']"),
                    title,
                    label,
                    labeled,
                    described,
                    any_label,
                    i = 0;

                for (i = 0; i < tabPanels.length; i = i + 1) {
                    title = tabPanels[i].attributes.getNamedItem("title");
                    label = tabPanels[i].attributes.getNamedItem("aria-label");
                    labeled = tabPanels[i].attributes.getNamedItem("aria-labeledby");
                    described = tabPanels[i].attributes.getNamedItem("aria-describedby");
                    any_label = "";

                    if (title && title.textContent.length !== 0) {
                        any_label = title.textContent;
                    }
                    if (label && label.textContent.length !== 0) {
                        any_label = label;
                    }
                    if (labeled && labeled.textContent.length !== 0 && document.getElementById(labeled.textContent)) {
                        any_label = labeled.textContent;
                    }
                    if (described && described.textContent.length !== 0 && document.getElementById(described.textContent)) {
                        any_label = described.textContent;
                    }
                    expect(any_label).not.toBe("");
                    expect(any_label.length).not.toBe(0);
                }
            });
        });

        /* behavior verification for the tabpanel widget */
        describe("widget behavior: ", function () {
            var tabFocusShouldChangeTabPanel = function (keycode) {
                var tabElements = document.querySelectorAll("[role='tab']"),
                    activeTab,
                    i = 0;

                for (i = 0; i < tabElements.length; i = i + 1) {
                    if (tabElements[i].tabIndex >= 0) {
                        activeTab = tabElements[i];
                        break;
                    }
                }

                activeTab.focus();
                for (i = 0; i < tabElements.length; i = i + 1) {
                    Helpers.dispatchKeyEvent(document.activeElement, keycode);
                    Helpers.verifyPanelVisibility(document.activeElement);
                }
            };

            it("the tab role element focus should move as the user press the down arrow key", function () {
                Helpers.verifyFocusChange(document, 40);
            });

            it("the tab role element focus should move as the user press the right arrow key", function () {
                Helpers.verifyFocusChange(document, 39);
            });

            it("the tab role element focus should move as the user press the up arrow key", function () {
                Helpers.verifyFocusChange(document, 38, -1);
            });

            it("the tab role element focus should move as the user press the up arrow key", function () {
                Helpers.verifyFocusChange(document, 37, -1);
            });

            it("the tabpanels should be visible as the tab role elements are active (on focus) when the down arrow is used", function () {
                tabFocusShouldChangeTabPanel(40);
            });

            it("the tabpanels should be visible as the tab role elements are active (on focus) when the right arrow is used", function () {
                tabFocusShouldChangeTabPanel(39);
            });

            it("the tabpanels should be visible as the tab role elements are active (on focus) when the up arrow is used", function () {
                tabFocusShouldChangeTabPanel(38);
            });

            it("the tabpanels should be visible as the tab role elements are active (on focus) when the left arrow is used", function () {
                tabFocusShouldChangeTabPanel(37);
            });

        });

    });
}(describe, it, expect, document, window));
