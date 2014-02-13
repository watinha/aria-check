#!/usr/bin/make
export CFX_MISSING_MESSAGE="you need to set the Addon-SDK in your shell..."
export IS_CFX_SET=`which cfx`
export PROFILEDIR=dev_profile
export CFX_FLAGS="--stop-on-error"
export PATH_FIXTURES="data/fixtures/tabpanel"
export RUN_SELENIUM_TESTS="bin/selenium_aria_check.sh"

help:
	@echo "****************************************************"
	@echo "***** \033[1;34maria-check help\033[0;0m                          *****"
	@echo "****************************************************"
	@echo "    \033[32mtests:\033[0m    - run tests using the Addon SDK"
	@echo "                test framework (cfx test)"
	@echo "    \033[32mjslint:\033[0m   - run js lint in the JS and test"
	@echo "                code"
	@echo "    \033[32mrun:\033[0m      - run the addon in the test "
	@echo "                browser (cfx run)"
	@echo "    \033[32mbuild:\033[0m    - build \"package\" xpi that will"
	@echo "                be deployed (cfx xpi)"
	@echo "    \033[32mdocs:\033[0m     - open the current version of the"
	@echo "                SDK documentation files"
	@echo "                (cfx docs)"
	@echo "    \033[32mdeploy:\033[0m   - not sure if there is a automatic"
	@echo "                way of doing this, but lets keep"
	@echo "                if because it is cool"
	@echo "    \033[32mselenium-tests:\033[0m   using true events"
	@echo "\n"

tests:
	@if [ $(IS_CFX_SET) ]; then\
		cfx test --profiledir=$(PROFILEDIR) $(CFX_FLAGS);\
	else\
		echo $(CFX_MISSING_MESSAGE);\
	fi

selenium-tests:
	@./bin/run_python_tests.sh $(PATH_FIXTURES) $(RUN_SELENIUM_TESTS)


jslint:
	@./bin/run_jslintr.sh

run:
	@if [ $(IS_CFX_SET) ]; then\
		cfx run --profiledir=$(PROFILEDIR);\
	else\
		echo $(CFX_MISSING_MESSAGE);\
	fi


build:
	@if [ $(IS_CFX_SET) ]; then\
		cfx xpi;\
	else\
		echo $(CFX_MISSING_MESSAGE);\
	fi


docs:
	@if [ $(IS_CFX_SET) ]; then\
		cfx docs;\
	else\
		echo $(CFX_MISSING_MESSAGE);\
	fi

deploy:
	@if [ -e "bin/deploy.sh" ]; then ./bin/deploy.sh; else echo "\033[32msecret deploy.sh file :)\033[0m"; fi

dev:
	./bin/setup.sh

.PHONY: help tests jslint run build docs deploy dev selenium-tests
