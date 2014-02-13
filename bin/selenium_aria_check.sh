#!/bin/sh
export URL=$1
python -m unittest discover -s $2 -p '*.py'
