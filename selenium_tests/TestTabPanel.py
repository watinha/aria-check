import unittest
import os

from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class TestRolesVerifications (unittest.TestCase):

    @classmethod
    def setUpClass(self):
        self.browser = webdriver.Firefox()
        self.browser.get("file://" + os.environ.get("PWD") + "/" + os.environ.get("URL"))


    def test_are_there_tabs (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        self.assertGreaterEqual(len(tabs), 1)


    def test_are_there_tabpanels (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tabpanel]")
        self.assertGreaterEqual(len(tabs), 1)


    def test_are_there_tablists (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tablist]")
        self.assertGreaterEqual(len(tabs), 1)


    def test_are_there_interactive_tabs (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        for tab in tabs:
            if int(tab.get_attribute("tabIndex")) >= 0:
                self.assertTrue(0 == 0)
                return

        self.assertTrue(0 == 1, "no interactive tabs")


    def test_are_there_the_same_number_of_tabs_and_tabpanels (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        tabpanels = self.browser.find_elements_by_css_selector("[role=tabpanel]")
        self.assertGreaterEqual(len(tabs), 0)
        self.assertEquals(len(tabs), len(tabpanels))


    def test_is_there_only_one_interactive_tab (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        interactive_tabs = []
        for tab in tabs:
            if int(tab.get_attribute("tabIndex")) >= 0:
                interactive_tabs.append(tab)

        self.assertEquals(len(interactive_tabs), 1)


    def test_if_there_is_a_label_for_each_tab (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        for tab in tabs:
            self.assertNotEquals(str(tab.text), "")


    def test_is_there_an_association_between_all_tabs_and_tabpanels (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        tabpanels = self.browser.find_elements_by_css_selector("[role=tabpanel]")
        associated = []

        for tab in tabs:
            for tabpanel in tabpanels:
                if str(tab.get_attribute("aria-controls")) == str(tabpanel.get_attribute("id")):
                    associated.append(tab)

        self.assertEquals(len(associated), len(tabs))
        self.assertEquals(len(tabs), len(tabpanels))
        self.assertGreaterEqual(len(tabs), 1)


    def test_all_tabpanels_present_text_alternative_attributes (self):
        tabpanels = self.browser.find_elements_by_css_selector("[role=tabpanel]")

        for tabpanel in tabpanels:
            title = tabpanel.get_attribute("title")
            aria_label = tabpanel.get_attribute("aria-label")
            aria_labelledby = tabpanel.get_attribute("aria-labelledby")
            aria_describedby = tabpanel.get_attribute("aria-describedby")
            self.assertTrue(title or aria_label or aria_labelledby or aria_describedby,
                            "there should be a text alternative for each tabpanel")

        self.assertGreaterEqual(len(tabpanels), 1)

    def test_is_the_only_visible_tabpanel_associated_with_the_active_tab (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        tabpanels = self.browser.find_elements_by_css_selector("[role=tabpanel]")
        active_tab = []

        for tab in tabs:
            if (int(tab.get_attribute("tabIndex")) >= 0):
                active_tab.append(tab)

        self.assertEquals(len(active_tab), 1)

        for tabpanel in tabpanels:
            aria_hidden = str(tabpanel.get_attribute("aria-hidden"))
            if str(tabpanel.get_attribute("id")) == str(active_tab[0].get_attribute("aria-controls")):
                self.assertTrue((aria_hidden == "False" or aria_hidden == "None") and tabpanel.is_displayed(),
                                "active tab associated tabpanel should be visible")
            else:
                self.assertTrue(aria_hidden == "true" or aria_hidden == "True" or not tabpanel.is_displayed(),
                                "other tabpanels should be invisible to assistive technologies")

    def _dispatch_key_and_focus_change (self, key, active_index, tabs):
        for j in range(0, len(tabs)):
            tabs[active_index].send_keys(key)

            for i in range(0, len(tabs)):
                if (int(tabs[i].get_attribute("tabIndex")) >= 0):
                    newly_active_tab = tabs[i]
                    newly_active_tab_index = i

            self.assertNotEquals(newly_active_tab, tabs[active_index], "active tab should be different after pressing down arrow")
            self.assertEquals(newly_active_tab_index, (active_index + 1) % len(tabs), "active tab should be the next one")

            active_index = newly_active_tab_index


    def test_down_arrow_in_tabs_change_active_tab_and_tabpanel_visibility (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        tabpanels = self.browser.find_elements_by_css_selector("[role=tabpanel]")

        for i in range(0, len(tabs)):
            if (int(tabs[i].get_attribute("tabIndex")) >= 0):
                active_tab = tabs[i]
                active_index = i

        active_tab.send_keys(Keys.NULL)

        self._dispatch_key_and_focus_change(Keys.ARROW_DOWN, active_index, tabs)


    @classmethod
    def tearDownClass(self):
        self.browser.quit()

