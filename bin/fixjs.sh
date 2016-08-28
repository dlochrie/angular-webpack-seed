#!/usr/bin/env bash

fixjsstyle -r app \
  --exclude_files=app/template-cache.js,app/common/translations.js \
  --strict \
  --jslint_error=all \
  --max_line_length 120
