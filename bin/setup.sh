#!/bin/sh

if [ -d "/Applications/Firefox.app/" ]; then
    echo "firefox...   \033[32mOK!\033[0m"
else
    echo "firefox...   \033[31mNOT ok!\033[0m"
    echo " - You should install firefox"
    echo ""
fi

NODE=`which node`
if [ $NODE ]; then
    echo "node...      \033[32mOK!\033[0m"
else
    echo "node...      \033[31mNOT ok!\033[0m"
    echo " - You should install nodejs"
    echo ""
fi

CFX=`which cfx`
if [ $CFX ]; then
    echo "addon-sdk... \033[32mOK!\033[0m"
else
    echo "addon-sdk... \033[31mNOT ok!\033[0m"
    echo " - You should install addon-sdk"
fi

JSLINTR=`which jslintr`
if [ $? -ne 0 ]; then
    echo "jslintr...   \033[31mNOT ok!\033[0m"
    echo " - JSlintr is necessary for this so install it"
    echo " - more info on: https://github.com/ccoria/JSLintr"
else
    echo "jslintr...   \033[32mOK!\033[0m"
fi
