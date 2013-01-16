(function (describe, it, expect, document, window) {
    "use strict";
    var Helpers = {
        dispatchKeyEvent: function (target, keycode, ctrlKey) {
            var keydownEvent = document.createEvent("KeyboardEvent"),
                keyupEvent = document.createEvent("KeyboardEvent"),
                keypressEvent = document.createEvent("KeyboardEvent"),
                ctrlKey = ctrlKey || false;

            keydownEvent.initKeyEvent("keydown", true, true, window, ctrlKey, false, false, false, keycode, keycode);
            keyupEvent.initKeyEvent("keyup", true, true, window, ctrlKey, false, false, false, keycode, keycode);
            keypressEvent.initKeyEvent("keypress", true, true, window, ctrlKey, false, false, false, keycode, keycode);

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
            var tabElements = document.querySelectorAll("*[role='tab']"),
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
                var tabElements = document.querySelectorAll("*[role='tab']"),
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
                expect(tabElements.length).not.toBe(0);
            });
        });

        /* checks initial interaction stats on tab elements */
        describe("initial interaction state: ", function () {
            it("there should be one focusable tab role element when the page loads", function () {
                var tabElements = document.querySelectorAll("*[role='tab']"),
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
                var tabElements = document.querySelectorAll("*[role='tab']"),
                    tabPanelElements = document.querySelectorAll("*[role='tabpanel']");

                expect(tabElements.length).toBe(tabPanelElements.length);
                expect(tabElements.length).not.toBe(0);
            });

            it("there should be only one interactive tab role element", function () {
                var tabElements = document.querySelectorAll("*[role='tab']"),
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
                var tabElements = document.querySelectorAll("*[role='tab']"),
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
                var tabElements = document.querySelectorAll("*[role='tab']"),
                    i = 0;

                expect(tabElements.length).not.toBe(0);
                for (i = 0; i < tabElements.length; i = i + 1) {
                    expect(tabElements[i].textContent).not.toBe("");
                    expect(tabElements[i].textContent.length).not.toBe(0);
                }
            });

            it("there should be descriptive text content for each tabpanel element", function () {
                var tabPanels = document.querySelectorAll("*[role='tabpanel']"),
                    tabs = document.querySelectorAll("*[role='tab']"),
                    title,
                    label,
                    labeled,
                    described,
                    any_label,
                    i = 0;

                expect(tabs.length).toBe(tabPanels.length);
                expect(tabs.length).not.toBe(0);
                for (i = 0; i < tabPanels.length; i = i + 1) {
                    title = tabPanels[i].attributes.getNamedItem("title");
                    label = tabPanels[i].attributes.getNamedItem("aria-label");
                    labeled = tabPanels[i].attributes.getNamedItem("aria-labelledby");
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
                    runs(function () {
                        Helpers.dispatchKeyEvent(document.activeElement, keycode);
                    });
                    waitsFor(function () {
                        var activeTabControlAttribute,
                            activeTabPanel,
                            panelInvisible,
                            tabPanelHidden,
                            tabPanelDisplay,
                            tabPanelVisibility;

                        activeTabControlAttribute = document.activeElement.attributes.getNamedItem("aria-controls").textContent;
                        activeTabPanel = document.getElementById(activeTabControlAttribute);

                        tabPanelHidden = activeTabPanel.attributes.getNamedItem("aria-hidden");
                        tabPanelDisplay = window.getComputedStyle(activeTabPanel, null).getPropertyValue("display");
                        tabPanelVisibility = window.getComputedStyle(activeTabPanel, null).getPropertyValue("visibility");

                        panelInvisible = (tabPanelHidden && tabPanelHidden.textContent === "true") ||
                                         (tabPanelDisplay === "none") ||
                                         (tabPanelVisibility === "hidden");
                        return !panelInvisible;
                    }, "something", 500);
                    runs(function() {
                        Helpers.verifyPanelVisibility(document.activeElement);
                    });
                }
            };

            it("the tab role element focus should move to the next tab as the user presses the down arrow key", function () {
                Helpers.verifyFocusChange(document, 40);
            });

            it("the tab role element focus should move to the next tab as the user presses the right arrow key", function () {
                Helpers.verifyFocusChange(document, 39);
            });

            it("the tab role element focus should move to the previous tab as the user presses the up arrow key", function () {
                Helpers.verifyFocusChange(document, 38, -1);
            });

            it("the tab role element focus should move to the previous tab as the user presses the left arrow key", function () {
                Helpers.verifyFocusChange(document, 37, -1);
            });

            it("the tab role element focus should move to the first tab as the user presses ctrl + home keys in the tabs", function () {
                var tabs = document.querySelectorAll("*[role='tab']"),
                    tabPanels = document.querySelectorAll("*[role='tabpanel']"),
                    i, activeTabIndex;

                for (var i = 0; i < tabs.length; i++) {
                    (function () {
                        var tabIndex = i;
                        runs(function () {
                            for(var j = 0; j < tabIndex; j++)
                                Helpers.dispatchKeyEvent(tabs[j], 40, false);
                        });
                        waitsFor(function () {
                            var tabPanelHidden = tabPanels[tabIndex].attributes.getNamedItem("aria-hidden"),
                                tabPanelDisplay = window.getComputedStyle(tabPanels[tabIndex], null).getPropertyValue("display"),
                                tabPanelVisibility = window.getComputedStyle(tabPanels[tabIndex], null).getPropertyValue("visibility"),
                                panelInvisible = (tabPanelHidden && tabPanelHidden.textContent === "true") ||
                                                 (tabPanelDisplay === "none") ||
                                                 (tabPanelVisibility === "hidden");
                            return !panelInvisible;
                        }, "something", 500);
                        runs(function () {
                            Helpers.dispatchKeyEvent(tabs[tabIndex], 36, true);
                            expect(document.activeElement).toBe(tabs[0]);
                        });
                        waitsFor(function () {
                            var tabPanelHidden = tabPanels[0].attributes.getNamedItem("aria-hidden"),
                                tabPanelDisplay = window.getComputedStyle(tabPanels[0], null).getPropertyValue("display"),
                                tabPanelVisibility = window.getComputedStyle(tabPanels[0], null).getPropertyValue("visibility"),
                                panelInvisible = (tabPanelHidden && tabPanelHidden.textContent === "true") ||
                                                 (tabPanelDisplay === "none") ||
                                                 (tabPanelVisibility === "hidden");
                            return !panelInvisible;
                        }, "another something", 500);
                        runs(function () {
                            Helpers.verifyPanelVisibility(tabs[0]);
                        });
                    }());
                };
            });

            it("the tab role element focus should move to the first tab as the user presses ctrl + end keys in the tabs", function () {
                var tabs = document.querySelectorAll("*[role='tab']"),
                    tabPanels = document.querySelectorAll("*[role='tabpanel']"),
                    i, activeTabIndex;

                for (var i = 0; i < tabs.length; i++) {
                    (function () {
                        var tabIndex = i;
                        runs(function () {
                            for(var j = 0; j < tabIndex; j++)
                                Helpers.dispatchKeyEvent(tabs[j], 40, false);
                        });
                        waitsFor(function () {
                            var tabPanelHidden = tabPanels[tabIndex].attributes.getNamedItem("aria-hidden"),
                                tabPanelDisplay = window.getComputedStyle(tabPanels[tabIndex], null).getPropertyValue("display"),
                                tabPanelVisibility = window.getComputedStyle(tabPanels[tabIndex], null).getPropertyValue("visibility"),
                                panelInvisible = (tabPanelHidden && tabPanelHidden.textContent === "true") ||
                                                 (tabPanelDisplay === "none") ||
                                                 (tabPanelVisibility === "hidden");
                            return !panelInvisible;
                        }, "something", 500);
                        runs(function () {
                            Helpers.dispatchKeyEvent(tabs[tabIndex], 35, true);
                            expect(document.activeElement).toBe(tabs[tabs.length - 1]);
                        });
                        waitsFor(function () {
                            var tabPanelHidden = tabPanels[tabs.length - 1].attributes.getNamedItem("aria-hidden"),
                                tabPanelDisplay = window.getComputedStyle(tabPanels[tabs.length - 1], null).getPropertyValue("display"),
                                tabPanelVisibility = window.getComputedStyle(tabPanels[tabs.length - 1], null).getPropertyValue("visibility"),
                                panelInvisible = (tabPanelHidden && tabPanelHidden.textContent === "true") ||
                                                 (tabPanelDisplay === "none") ||
                                                 (tabPanelVisibility === "hidden");
                            return !panelInvisible;
                        }, "another something", 500);
                        runs(function () {
                            Helpers.verifyPanelVisibility(tabs[tabs.length - 1]);
                            Helpers.dispatchKeyEvent(tabs[tabs.length - 1], 40, false);
                        });
                    }());
                };
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

            it("the focus should change to the active tab element as the user is inside a tabpanel and press the ctrl + up arrow key", function () {
                var tabPanels = document.querySelectorAll("*[role='tabpanel']"),
                    i;

                document.body.tabIndex = 0;
                for (var i = 0; i < tabPanels.length; i++) {
                    document.body.focus();
                    Helpers.dispatchKeyEvent(tabPanels[i], 38, true);
                    expect(document.activeElement.attributes.getNamedItem("aria-controls").textContent).toBe(tabPanels[i].id);
                    Helpers.dispatchKeyEvent(document.activeElement, 40, false);
                };
            });

            it("the focus should change to the previous tab element as the user is inside a tabpanel and press the ctrl + pageup key", function () {
                var tabPanels = document.querySelectorAll("*[role='tabpanel']"),
                    i, activeTabIndex;

                document.body.tabIndex = 0;
                for (var i = 0; i < tabPanels.length; i++) {
                    document.body.focus();
                    Helpers.dispatchKeyEvent(tabPanels[i], 33, true);
                    activeTabIndex = ((i - 1) < 0) ? (tabPanels.length - 1) : (i - 1);
                    expect(document.activeElement.attributes.getNamedItem("aria-controls").textContent).toBe(tabPanels[activeTabIndex].id);
                    Helpers.dispatchKeyEvent(document.activeElement, 40, false);
                    Helpers.dispatchKeyEvent(document.activeElement, 40, false);
                };
            });

            it("the focus should change to the next tab element as the user is inside a tabpanel and press the ctrl + pagedown key", function () {
                var tabPanels = document.querySelectorAll("*[role='tabpanel']"),
                    i, activeTabIndex;

                document.body.tabIndex = 0;
                for (var i = 0; i < tabPanels.length; i++) {
                    document.body.focus();
                    Helpers.dispatchKeyEvent(tabPanels[i], 34, true);
                    activeTabIndex = (i + 1) % tabPanels.length;
                    expect(document.activeElement.attributes.getNamedItem("aria-controls").textContent).toBe(tabPanels[activeTabIndex].id);
                };
            });

        });

    });
}(describe, it, expect, document, window));
