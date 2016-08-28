#!/usr/bin/env bash
LESS_EXEC=./node_modules/less/bin/lessc

find app/ -name '*.less' \
  | sort \
  | xargs cat \
  | $LESS_EXEC - --clean-css  \
  > public/css/application.css
