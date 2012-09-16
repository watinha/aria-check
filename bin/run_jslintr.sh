#!/bin/sh

JSLINTR=`which jslintr`

if [ $? -ne 0 ]; then
    echo "JSlintr is necessary for this so install it"
    echo " more info on: https://github.com/ccoria/JSLintr"
    exit 1;
fi

$JSLINTR data/
$JSLINTR lib/
$JSLINTR test/
