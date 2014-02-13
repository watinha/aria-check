#!/bin/sh
FIXTURE_PATH=$1
ARIA_CHECK_COMMAND=$2
FIXTURES_NOK=`find $FIXTURE_PATH -name tabpanel_dummy*.html`
FIXTURES_OK=`find $FIXTURE_PATH -name tabpanel_perfect*.html`

for i in $FIXTURES_NOK; do
    $ARIA_CHECK_COMMAND $i;
    if [[ $? -eq 0 ]]; then
        echo "$i .. \033[31mNot OK\033[0m"
    else
        echo "$i .. \033[32mOK\033[0m"
    fi
done
for i in $FIXTURES_OK; do
    $ARIA_CHECK_COMMAND $i;
    if [[ $? -eq 0 ]]; then
        echo "$i .. \033[32mOK\033[0m"
    else
        echo "$i .. \033[31mNot OK\033[0m"
    fi
done
