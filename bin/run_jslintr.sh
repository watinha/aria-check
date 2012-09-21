#!/bin/sh

JSLINTR=`which jslintr`

if [ $? -ne 0 ]; then
    echo "JSlintr is necessary for this so install it"
    echo " more info on: https://github.com/ccoria/JSLintr"
    echo " - also remember to set the options in v8_jslint.js file"
    echo "  var options = {"
    echo "      rhino: true,"
    echo "      passfail: false,"
    echo "      indent: 4,"
    echo "      node: true"
    echo "  };"
    exit 1;
fi

$JSLINTR ./
