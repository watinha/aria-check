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

    @classmethod
    def tearDownClass(self):
        self.browser.quit()
