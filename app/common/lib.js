/**
 * @fileoverview Provides common utilities for use throughout the app. These are
 * all static methods, and therefore do not operate on any state/scope.
 */
var util = require('util'),
    constants = require('../common/constants');


/**
 * Provides a No-Op function wrapper for situations that do not require any
 * operation/logic.
 */
exports.NOOP = function() {};
