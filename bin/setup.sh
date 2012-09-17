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
