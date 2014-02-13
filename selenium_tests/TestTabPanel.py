import unittest
import os

from selenium import webdriver

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


    @unittest.skip("demonstrating skipping")
    def test_is_there_only_one_tabpanel_which_is_visible (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tabpanel]")
        interactive_tabs = []
        for tab in tabs:
            if int(tab.get_attribute("tabIndex")) >= 0:
                interactive_tabs.append(tab)

        self.assertEquals(len(interactive_tabs), 1)


    @classmethod
    def tearDownClass(self):
        self.browser.quit()
