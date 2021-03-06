import unittest
import os
import time

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestRolesVerifications (unittest.TestCase):

    @classmethod
    def setUpClass(self):
        self.browser = webdriver.Firefox()
        self.browser.get(os.environ.get("URL"))


    def test_01_roles_are_there_tabs (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        self.assertGreaterEqual(len(tabs), 1)


    def test_02_roles_are_there_tabpanels (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tabpanel]")
        self.assertGreaterEqual(len(tabs), 1)


    def test_03_roles_are_there_tablists (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tablist]")
        self.assertGreaterEqual(len(tabs), 1)


    def test_04_initial_interaction_are_there_interactive_tabs (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        for tab in tabs:
            if int(tab.get_attribute("tabIndex")) >= 0:
                self.assertTrue(0 == 0)
                return

        self.assertTrue(0 == 1, "no interactive tabs")


    def test_05_initial_interaction_are_there_the_same_number_of_tabs_and_tabpanels (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        tabpanels = self.browser.find_elements_by_css_selector("[role=tabpanel]")
        self.assertGreaterEqual(len(tabs), 0)
        self.assertEquals(len(tabs), len(tabpanels))


    def test_06_initial_interaction_is_there_only_one_interactive_tab (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        interactive_tabs = []
        for tab in tabs:
            if int(tab.get_attribute("tabIndex")) >= 0:
                interactive_tabs.append(tab)

        self.assertEquals(len(interactive_tabs), 1)


    def test_07_text_alternative_if_there_is_a_label_for_each_tab (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        for tab in tabs:
            self.assertNotEquals(str(tab.text), "")


    def test_08_widget_structure_is_there_an_association_between_all_tabs_and_tabpanels (self):
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


    def test_09_text_alternative_all_tabpanels_present_text_alternative_attributes (self):
        tabpanels = self.browser.find_elements_by_css_selector("[role=tabpanel]")

        for tabpanel in tabpanels:
            title = tabpanel.get_attribute("title")
            aria_label = tabpanel.get_attribute("aria-label")
            aria_labelledby = tabpanel.get_attribute("aria-labelledby")
            aria_describedby = tabpanel.get_attribute("aria-describedby")
            self.assertTrue(title or aria_label or aria_labelledby or aria_describedby,
                            "there should be a text alternative for each tabpanel")

        self.assertGreaterEqual(len(tabpanels), 1)

    def test_10_initial_interaction_is_the_only_visible_tabpanel_associated_with_the_active_tab (self):
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
                self.assertTrue((aria_hidden == "False" or aria_hidden == "false" or aria_hidden == "None") and tabpanel.is_displayed(),
                                "active tab associated tabpanel should be visible")
            else:
                self.assertTrue(aria_hidden == "true" or aria_hidden == "True" or not tabpanel.is_displayed(),
                                "other tabpanels should be invisible to assistive technologies")


    def _set_focus_on_active_tab (self, tabs):
        for i in range(0, len(tabs)):
            if (int(tabs[i].get_attribute("tabIndex")) >= 0):
                active_index = i

        tabs[active_index].send_keys(Keys.NULL)
        return active_index


    def _dispatch_key_and_focus_change (self, key, active_index, tabs, increment = 1):
        for j in range(0, len(tabs)):
            tabs[active_index].send_keys(key)

            time.sleep(1)

            for i in range(0, len(tabs)):
                if (int(tabs[i].get_attribute("tabIndex")) >= 0):
                    newly_active_tab = tabs[i]
                    newly_active_tab_index = i

            self.assertNotEquals(newly_active_tab, tabs[active_index],
                "active tab should be different after pressing arrow keys")
            self.assertEquals(newly_active_tab_index, (active_index + increment) % len(tabs))

            active_index = newly_active_tab_index


    def test_11_behavior_down_arrow_in_tabs_change_active_tab (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        active_index = self._set_focus_on_active_tab(tabs)

        self._dispatch_key_and_focus_change(Keys.ARROW_DOWN, active_index, tabs)


    def test_12_behavior_right_arrow_in_tabs_change_active_tab (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        active_index = self._set_focus_on_active_tab(tabs)

        self._dispatch_key_and_focus_change(Keys.ARROW_RIGHT, active_index, tabs)


    def test_13_behavior_up_arrow_in_tabs_change_active_tab (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        active_index = self._set_focus_on_active_tab(tabs)

        self._dispatch_key_and_focus_change(Keys.ARROW_UP, active_index, tabs, -1)


    def test_14_behavior_left_arrow_in_tabs_change_active_tab (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        active_index = self._set_focus_on_active_tab(tabs)

        self._dispatch_key_and_focus_change(Keys.ARROW_LEFT, active_index, tabs, -1)

    def _type_arrow_key_and_verify_panel_visibility (self, tabs, tabpanels, key, increment = 1):
        active_index = self._set_focus_on_active_tab(tabs)
        wait = WebDriverWait(self.browser, 3)

        tabs[active_index].send_keys(key)

        for tabpanel in tabpanels:
            if str(tabpanel.get_attribute("id")) == str(tabs[(active_index + increment)
                                                        % len(tabpanels)].get_attribute("aria-controls")):
                wait.until(EC.visibility_of_element_located((By.ID, str(tabpanel.get_attribute("id")))))
                aria_hidden = str(tabpanel.get_attribute("aria-hidden"))
                self.assertTrue((aria_hidden == "False" or
                                 aria_hidden == "false" or
                                 aria_hidden == "None") and tabpanel.is_displayed(),
                                "active tab associated tabpanel should be visible")
            else:
                wait.until(EC.invisibility_of_element_located((By.ID, str(tabpanel.get_attribute("id")))))
                aria_hidden = str(tabpanel.get_attribute("aria-hidden"))
                self.assertTrue(aria_hidden == "true" or aria_hidden == "True" or not tabpanel.is_displayed(),
                                "other tabpanels should be invisible to assistive technologies")

    def test_15_behavior_down_arrow_in_tabs_change_tabpanel_visibility (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        tabpanels = self.browser.find_elements_by_css_selector("[role=tabpanel]")

        for i in range(0, len(tabs)):
            self._type_arrow_key_and_verify_panel_visibility(tabs, tabpanels, Keys.ARROW_DOWN)


    def test_16_behavior_right_arrow_in_tabs_change_tabpanel_visibility (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        tabpanels = self.browser.find_elements_by_css_selector("[role=tabpanel]")

        for i in range(0, len(tabs)):
            self._type_arrow_key_and_verify_panel_visibility(tabs, tabpanels, Keys.ARROW_RIGHT)


    def test_17_behavior_up_arrow_in_tabs_change_tabpanel_visibility (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        tabpanels = self.browser.find_elements_by_css_selector("[role=tabpanel]")

        for i in range(0, len(tabs)):
            self._type_arrow_key_and_verify_panel_visibility(tabs, tabpanels, Keys.ARROW_UP, -1)


    def test_18_behavior_left_arrow_in_tabs_change_tabpanel_visibility (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        tabpanels = self.browser.find_elements_by_css_selector("[role=tabpanel]")

        for i in range(0, len(tabs)):
            self._type_arrow_key_and_verify_panel_visibility(tabs, tabpanels, Keys.ARROW_LEFT, -1)

    def _make_all_tabpanels_focusable (self):
        script = """
                (function () {
                    var tabpanels = document.querySelectorAll("[role=tabpanel]");
                    for (var i = 0; i < tabpanels.length; i++)
                        tabpanels[i].tabIndex = 0;
                })();
                """
        self.browser.execute_script(script)

    def _set_focus_to_the_active_tabpanel_element (self, tabs, active_index):
        wait = WebDriverWait(self.browser, 3)
        active_tabpanel = self.browser.find_element_by_id(
            str(tabs[active_index].get_attribute("aria-controls")))
        wait.until(EC.visibility_of_element_located((By.ID, str(active_tabpanel.get_attribute("id")))))
        active_tabpanel.send_keys(Keys.NULL)
        return active_tabpanel

    def _dispatch_keys_in_panel_and_check_which_tab_is_focused (self, key1, key2, increment, key3):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        self._make_all_tabpanels_focusable()

        for i in range(0, len(tabs)):
            active_index = self._set_focus_on_active_tab(tabs)
            active_tabpanel = self._set_focus_to_the_active_tabpanel_element(tabs, active_index)
            active_tabpanel.send_keys(key1, key2)

            focused_element = self.browser.find_element_by_css_selector("*:focus")
            self.assertEquals(focused_element, tabs[(active_index + increment) % len(tabs)],
                "the focus is not set to the active tab element")
            focused_element.send_keys(key3)

    def test_19_behavior_ctrl_up_in_panel_set_focus_to_the_active_tab_element (self):
        self._dispatch_keys_in_panel_and_check_which_tab_is_focused(
            Keys.LEFT_CONTROL, Keys.ARROW_UP, 0, Keys.ARROW_DOWN)


    def test_20_behavior_ctrl_pageup_in_panel_set_focus_to_the_previous_tab_element (self):
        self._dispatch_keys_in_panel_and_check_which_tab_is_focused(
            Keys.LEFT_CONTROL, Keys.PAGE_UP, -1, Keys.NULL)


    def test_21_behavior_ctrl_pagedown_in_panel_set_focus_to_the_next_tab_element (self):
        self._dispatch_keys_in_panel_and_check_which_tab_is_focused(
            Keys.LEFT_CONTROL, Keys.PAGE_DOWN, 1, Keys.NULL)


    def test_22_behavior_ctrl_home_in_tab_set_focus_to_the_first_tab_element (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        active_index = self._set_focus_on_active_tab(tabs)

        for i in range(1, len(tabs)):
            for j in range(1, i):
                tabs[active_index].send_keys(Keys.ARROW_DOWN)
                active_index = self._set_focus_on_active_tab(tabs)
            tabs[active_index].send_keys(Keys.LEFT_CONTROL, Keys.HOME)

            active_index = self._set_focus_on_active_tab(tabs)
            self.assertEquals(active_index, 0)

    def test_23_behavior_ctrl_end_in_tab_set_focus_to_the_first_tab_element (self):
        tabs = self.browser.find_elements_by_css_selector("[role=tab]")
        active_index = self._set_focus_on_active_tab(tabs)

        for i in range(0, len(tabs)):
            for j in range(0, i):
                tabs[active_index].send_keys(Keys.ARROW_DOWN)
                active_index = self._set_focus_on_active_tab(tabs)
            tabs[active_index].send_keys(Keys.LEFT_CONTROL, Keys.END)

            active_index = self._set_focus_on_active_tab(tabs)
            self.assertEquals(active_index, len(tabs) - 1)


    @classmethod
    def tearDownClass(self):
        self.browser.quit()


