import unittest
import os

class TestRolesVerifications (unittest.TestCase):

    def test_are_there_tabs (self):
        self.assertEquals('selenium_tests/tabpanel', os.environ.get("URL"))
