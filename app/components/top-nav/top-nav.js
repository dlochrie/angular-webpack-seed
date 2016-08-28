var TopNavController = require('./top-nav-controller'),
    topNavDirective = require('./top-nav-directive');


/**
 * Definition for the Top Nav module.
 */
module.exports = angular.module('awesomeness.components.topNav', []).
    controller('TopNavController', TopNavController).
    directive('topNav', topNavDirective);
